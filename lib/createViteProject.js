const { execSync } = require("child_process");
const { join: joinPath } = require("path");
const { readFileSync, writeFileSync } = require("fs-extra");
const {resolveProjectPath} = require("./utils")

async function createReactRouterFrameworkMode(
  projectName
) {
  try {
    const projectPath = resolveProjectPath(projectName)

    const isInSameDir = projectName === "."

    console.log(
      `Creating React Router Framework Mode project in ${projectPath}...`
    );

    execSync(`npx create-react-router@latest ${projectName}`, {
      stdio: "inherit",
    });

    process.chdir(projectPath);

    console.log(`Project '${isInSameDir ? projectName : ""}' created successfully!`);
  } catch (error) {
    console.log("Error creating project:", error);
  }
}

// This function initializes for declarative mode or data mode.
async function createReactRouterDeclarativeOrDataMode(
  projectName,
  packageManager = "npm"
) {
  try {
    const projectPath = resolveProjectPath(projectName)

    const isInSameDir = projectName === "."

    console.log(`Creating Project in ${projectPath}...`);

    execSync(
      `${packageManager} create vite@latest ${projectName} -- --template react-ts -y`,
      {
        stdio: "inherit",
      }
    );

    // Fix package.json name
    const pkgPath = joinPath(projectPath, "package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    pkg.name = projectName.toLowerCase().replace(/\s+/g, "-");
    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    process.chdir(projectPath);

    const isYarn = packageManager === "yarn";
    const installCmd = isYarn ? "add" : `i`;

    console.log("Installing React Router....");

    execSync(`${packageManager} ${installCmd} react-router`, {
      stdio: "inherit",
    });

    console.log("React Router installed successfully.");

    execSync(`${packageManager} i`, { stdio: "inherit" });

    console.log(`React Router project '${isInSameDir ? projectName : ""}' created successfully!`);
  } catch (error) {
    console.log("Error creating project:", error);
    return false;
  }
}

module.exports = {
  createReactRouterFrameworkMode,
  createReactRouterDeclarativeOrDataMode,
};
