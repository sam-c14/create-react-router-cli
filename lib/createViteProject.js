const { execSync } = require("child_process");
const path = require("path");

async function createReactRouterFrameworkMode(
  projectName,
  pacakgeManager = "npm"
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

    execSync(`${pacakgeManager} i`, { stdio: "inherit" });

    console.log(`React Router project '${projectName}' created successfully!`);
  } catch (error) {
    console.log("Error creating project:", error);
  }
}

// This function initializes for declarative mode or data mode.
async function createReactRouterDeclarativeOrDataMode(
  projectName,
  pacakgeManager = "npm"
) {
  try {
    const projectPath = path.join(process.cwd(), projectName);

    console.log(`Creating React Router project in ${projectPath}...`);

    execSync(`npx create vite@latest ${projectName} -- --template react-ts`, {
      stdio: "inherit",
    });

    process.chdir(projectPath);

    const isYarn = packakgeManager === "yarn";
    const installCmd = isYarn ? "add" : `i`;

    execSync(`${pacakgeManager} ${installCmd} react-router`, {
      stdio: "inherit",
    });

    console.log("React Router installed successfully.");

    execSync(`${pacakgeManager} i`, { stdio: "inherit" });

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
