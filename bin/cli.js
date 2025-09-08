#!/usr/bin/env node
const { createPromptModule } = require("inquirer");
const {
  createReactRouterDeclarativeOrDataMode,
  createReactRouterFrameworkMode,
} = require("../lib/createViteProject");
const { generateStructure } = require("../lib/generateStructure");

const prompt = createPromptModule();

const DEFAULT_PROJECT_NAME = "react-router-project"

async function promptUser() {
  const [, , argProjectName] = process.argv;
  const defaultProjectName = argProjectName?.trim?.()

  const questions = [
    {
      type: "list",
      name: "routerMode",
      message:
        "What mode of react router would you like to use? (Default is declarative)",
      choices: ["Declarative", "Data", "Framework"],
      default: "Declarative",
    },
    {
      type: "list",
      name: "packageManager",
      message: "What package manager would you like to use?",
      choices: ["npm", "pnpm", "yarn", "bun"],
      when: (answers) => answers.routerMode !== "Framework",
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      validate: (input) => {
        if(input === ".") return true
        else if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        return "Project name may only include letters, numbers, underscores and hashes.";
      },
      default: DEFAULT_PROJECT_NAME,
      when: (_) => argProjectName === undefined || !defaultProjectName?.length, // When a user initializes with a project name in cli
    },
    {
      type: "input",
      name: "includeTailwindCss",
      message: "Include Tailwind CSS? [Y/n]:",
      when: (answers) => answers.routerMode !== "Framework",
    },
  ];

  return prompt(questions);
}

async function initializeProject() {
  console.log("Initializing project...");

  const answers = await promptUser();
  const [, , argProjectName] = process.argv;
  const defaultProjectName = argProjectName?.trim?.() ?? DEFAULT_PROJECT_NAME

  const packageManager = answers.packageManager;
  const reactRouterMode = answers.routerMode;
  const projectName = answers.projectName ?? defaultProjectName;
  const includeTailwindCss = answers.includeTailwindCss === "Y";

  if (reactRouterMode.toLowerCase() !== "framework")
    await createReactRouterDeclarativeOrDataMode(projectName, packageManager);
  else await createReactRouterFrameworkMode(projectName);

  await generateStructure(reactRouterMode, packageManager, includeTailwindCss);
}

initializeProject().catch(console.error);
