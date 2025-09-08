const { execSync } = require("child_process");
const path = require("path");

async function createReactRouterFrameworkMode(
  projectName,
  packageManager = "npm"
) {
  try {
    const projectPath = path.join(process.cwd(), projectName);

    console.log(
      `Creating React Router Framework Mode project in ${projectPath}...`
    );

    execSync(`npx create-react-router@latest ${projectName}`, {
      stdio: "inherit",
    });

    process.chdir(projectPath);

    execSync(`${packageManager} i`, { stdio: "inherit" });

    console.log(`React Router project '${projectName}' created successfully!`);
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
    const projectPath = path.join(process.cwd(), projectName);

    console.log(
      `Creating React Router project in ${packageManager} ${projectPath}...`
    );

    execSync(
      `${packageManager} create vite@latest ${projectName} -- --template react-ts`,
      {
        stdio: "inherit",
      }
    );

    process.chdir(projectPath);

    const isYarn = packageManager === "yarn";
    const installCmd = isYarn ? "add" : `i`;

    execSync(`${packageManager} ${installCmd} react-router`, {
      stdio: "inherit",
    });

    console.log("React Router installed successfully.");

    execSync(`${packageManager} i`, { stdio: "inherit" });

    console.log(`React Router project '${projectName}' created successfully!`);
  } catch (error) {
    console.log("Error creating project:", error);
    return false;
  }
}

module.exports = {
  createReactRouterFrameworkMode,
  createReactRouterDeclarativeOrDataMode,
};
