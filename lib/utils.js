const { join: joinPath } = require("path");
const {
  frameworkModeAppClientRender,
  frameworkModeRootTemplate,
  frameworkModeConfigTemplate,
} = require("../constants/route-templates");

const {
  loginTemplate,
  layoutTemplate,
  homePageTemplate,
} = require("../constants/main-templates");

const {
  buttonTemplate,
  drawerTemplate,
} = require("../constants/extra-templates");

const {
  homePageCustomTemplate,
  layoutCustomTemplate,
  loginCustomTemplate,
  buttonCustomTemplate,
  drawerCustomTemplate,
  styles,
} = require("../constants/main-templates-custom-styled");

const {
  readFileSync,
  writeFileSync,
  removeSync,
  outputFile,
} = require("fs-extra");
const { execSync } = require("child_process");

/**
 * Function to add tailwindcss to the project.
 * Not to be used when the project is in framework mode.
 * @param {string} srcDir - The src directory in the react application
 * @param {string} packageManager - The package manager selected by the user.
 */

function addTailwindCss(srcDir, packageManager = "npm") {
  const isNpm = packageManager === "npm";
  const installCmd = isNpm ? "i" : `add`;
  const devCmd = packageManager === "bun" ? "-d" : "-D";

  try {
    execSync(
      `${packageManager} ${installCmd} ${devCmd} tailwindcss @tailwindcss/vite`,
      {
        stdio: "inherit",
      }
    );

    let viteConfig = readFileSync(
      joinPath(process.cwd(), "vite.config.ts"),
      "utf-8"
    );

    if (!viteConfig.includes("import tailwindcss from '@tailwindcss/vite'")) {
      viteConfig =
        `import tailwindcss from '@tailwindcss/vite';\n` + viteConfig;
    }

    // 2. Add tailwindcss() to the plugins array
    if (!viteConfig.includes("tailwindcss()")) {
      viteConfig = viteConfig.replace(
        /plugins:\s*\[([^\]]*)\]/s,
        (_match, pluginsContent) => {
          // Clean up spacing and add tailwindcss()
          const newPlugins = pluginsContent
            .split(",")
            .map((p) => p.trim())
            .filter((p) => p.length > 0);

          newPlugins.push("tailwindcss()");

          return `plugins: [${newPlugins.join(", ")}]`;
        }
      );
    }

    writeFileSync(joinPath(process.cwd(), "vite.config.ts"), viteConfig);
    writeFileSync(joinPath(srcDir, "index.css"), '@import "tailwindcss";');
  } catch (error) {
    console.warn(error);
    console.log("Failed to add tailwindcss to the project....");
  }
}

/**
 * Initailizes all necessary configurations for the project in framework mode.
 * @param {string} appDir - The app directory specific to the project
 */
async function handleFrameworkModeInitialization(appDir) {
  try {
    removeSync(joinPath(appDir, "routes"));
    removeSync(joinPath(appDir, "welcome"));
    await outputFile(
      joinPath(appDir, "entry.client.tsx"),
      frameworkModeAppClientRender
    );
    await outputFile(joinPath(appDir, "root.tsx"), frameworkModeRootTemplate);
    await outputFile(
      joinPath(process.cwd(), "react-router.config.ts"),
      frameworkModeConfigTemplate
    );
  } catch (error) {
    console.log(
      "Error happened while initializing for framework mode, ",
      error
    );
  }
}

/**
 * Resolves the directory specified by the user.
 * @param {string} projectName - The project name selected by the user.
 * @returns {string}
 */
function resolveProjectPath(projectName) {
  let path = process.cwd();

  if (path !== ".") path = joinPath(process.cwd(), projectName);

  return path;
}

/**
 * Initializes the jsx templates for the application
 * @param {boolean} includeTailwindCss - Conditionally includes tailwindcss package
 * @param {boolean} isFrameworkMode - Checks if react router mode is framework mode
 * @param {string} srcDir = Current source directory
 * @returns
 */
function initializeJsx(includeTailwindCss, isFrameworkMode, srcDir) {
  let layout = layoutTemplate,
    home = homePageTemplate,
    login = loginTemplate,
    button = buttonTemplate,
    drawer = drawerTemplate;

  if (!includeTailwindCss && !isFrameworkMode) {
    layout = layoutCustomTemplate;
    home = homePageCustomTemplate;
    login = loginCustomTemplate;
    button = buttonCustomTemplate;
    drawer = drawerCustomTemplate;
    writeFileSync(joinPath(srcDir, "index.css"), styles);
  }

  return {
    homeTemplate: home,
    loginTemplate: login,
    layoutTemplate: layout,
    buttonTemplate: button,
    drawerTemplate: drawer,
  };
}

module.exports = {
  addTailwindCss,
  handleFrameworkModeInitialization,
  resolveProjectPath,
  initializeJsx,
};
