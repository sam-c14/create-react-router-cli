const { join: joinPath } = require("path");
const {
  frameworkModeAppClientRender,
  frameworkModeRootTemplate,
  frameworkModeConfigTemplate,
} = require("../constants/route-templates");

const { readFileSync, writeFileSync, removeSync } = require("fs-extra");
const { execSync } = require("child_process");

/**
 * Function to add tailwindcss to the project.
 * Not to be used when the project is in framework mode.
 * @param {*} srcDir - The src directory in the react application
 * @param {*} packageManager - The package manager selected by the user.
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
      viteConfig = viteConfig.replace(
        /(import\s[^\n]+;\n)/, // matches the first import line
        `$1import tailwindcss from '@tailwindcss/vite';\n`
      );
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
          newPlugins.push("tsconfigPaths()");

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

async function handleFrameworkModeInitialization(appDir) {
  try {
    removeSync(joinPath(appDir, "routes"));
    removeSync(joinPath(appDir, "welcome"));
    await outputFile(
      joinPath(appDir, "entry.client.tsx"),
      frameworkModeAppClientRender
    );
    await outputFile(joinPath(srcDir, "root.tsx"), frameworkModeRootTemplate);
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

module.exports = {
  addTailwindCss,
  handleFrameworkModeInitialization,
};
