const {
  existsSync,
  outputFile,
  ensureDir,
  removeSync,
} = require("fs-extra");
const { join: joinPath } = require("path");
const { execSync } = require("child_process");
const { folders, extraDependencies } = require("../constants");
const {
  authConfigTemplate,
  constantsConfigTemplate,
  useLoginHookTemplate,
  sharedProvidersTemplate,
} = require("../constants/main-templates");

const {
  utilsTemplate,
  iconsTemplate,
  indexIconTemplate,
  indexHtmlTemplate,
} = require("../constants/extra-templates");

const {
  dataModeRouteTemplate,
  declarativeRouteTemplate,
  frameworkModeRouteTemplate,
  dataModeAppRender,
  declarativeAppRender,
} = require("../constants/route-templates");

const {
  addTailwindCss,
  handleFrameworkModeInitialization,
  initializeJsx,
} = require("./utils");

/**
 * Scaffolds the app with react-router and the feature-driven folder structure.
 * @param {string} reactRouterMode - This uses the current react-router mode declarative | data | framework.
 * @param {string} packageManager - Package manager selcted by the user.
 * @param {boolean} includeTailwindCss - Boolean to include or exclude tailwindcss, auto included for framework mode.
 * @returns
 */
async function generateStructure(
  reactRouterMode = "declarative",
  packageManager = "npm",
  includeTailwindCss = false
) {
  console.log("Generating project structure...");
  const mode = reactRouterMode.toLowerCase();
  const isDataMode = mode === "data";
  const isFrameworkMode = mode === "framework";
  const isDeclarativeMode = mode === "declarative";

  const srcDir = joinPath(process.cwd(), isFrameworkMode ? "app" : "src");

  if (!existsSync(srcDir) && !isFrameworkMode) {
    console.log(
      "No src directory found, Please run this inside a react project"
    );
    return false;
  }

  const appRender = isDataMode ? dataModeAppRender : declarativeAppRender;

  let routeTemplate = declarativeRouteTemplate;

  if (isDataMode) {
    routeTemplate = dataModeRouteTemplate;
  } else if (isFrameworkMode) {
    routeTemplate = frameworkModeRouteTemplate;
  }

  const {
    buttonTemplate,
    drawerTemplate,
    homeTemplate,
    layoutTemplate,
    loginTemplate,
  } = initializeJsx(includeTailwindCss, isFrameworkMode, srcDir);

  const files = {
    [joinPath(srcDir, "config", "constants", "index.ts")]:
      constantsConfigTemplate,
    [joinPath(srcDir, "config", "auth", "auth-config.ts")]: authConfigTemplate,
    [joinPath(srcDir, "features", "auth", "login.tsx")]: loginTemplate,
    [joinPath(srcDir, "features", "auth", "use-login.tsx")]:
      useLoginHookTemplate,
    [joinPath(srcDir, "features", "shared", "providers", "app-context.tsx")]:
      sharedProvidersTemplate,
    [joinPath(srcDir, "features", "shared", "layout", "layout.tsx")]:
      layoutTemplate,
    [joinPath(srcDir, "features", "base", "home.tsx")]: homeTemplate,
    [joinPath(srcDir, "ui", "button", "button.tsx")]: buttonTemplate,
    [joinPath(srcDir, "ui", "drawer", "drawer.tsx")]: drawerTemplate,
    [joinPath(srcDir, "lib", "utils", "index.ts")]: utilsTemplate,
    [joinPath(srcDir, "assets", "icons", "magnifying-glass.tsx")]:
      iconsTemplate,
    [joinPath(srcDir, "assets", "icons", "index.ts")]: indexIconTemplate,
    [joinPath(srcDir, !isFrameworkMode ? "routes.tsx" : "routes.ts")]:
      routeTemplate,
  };

  if (isDataMode || isDeclarativeMode) {
    files[joinPath(srcDir, "main.tsx")] = appRender;
    files[joinPath(srcDir, "index.html")] = indexHtmlTemplate;
    removeSync(joinPath(srcDir, "App.tsx"));
    removeSync(joinPath(srcDir, "App.css"));
  } else await handleFrameworkModeInitialization(srcDir);

  for (const folder of folders) {
    const folderPath = joinPath(srcDir, folder);
    await ensureDir(folderPath);
  }

  for (const [filePath, content] of Object.entries(files)) {
    await outputFile(filePath, content.trim());
  }

  if (includeTailwindCss && !isFrameworkMode)
    addTailwindCss(srcDir, packageManager);

  // Add extra dependencies
  try {
    execSync(`npm install ${extraDependencies.join(" ")}`, {
      stdio: "inherit",
    });
    console.log(
      "Your React Router app has been successfully generated, Happy Coding 🚀"
    );
  } catch (error) {
    console.warn(
      "Warning: Could not install additional extra dependencies automatically.",
      error
    );
    console.log("Please manually install: " + extraDependencies.join(", "));
    console.log("Happy Coding 🚀");
  }
}

module.exports = {
  generateStructure,
};
