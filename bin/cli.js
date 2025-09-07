#!/usr/bin/env node
const inquirer = require("inquirer");
const { createViteProject } = require("../lib/createViteProject");
const { generateStructure } = require("../lib/generateStructure");

async function promptUser() {
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
      choices: ["Npm", "Pnpm", "Yarn", "Bun"],
    },
    {
      type: "input",
      name: "projectName",
      message: "Enter project name:",
      validate: (input) => {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
        return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      type: "input",
      name: "hasTailwindCss",
      message: "Do you want tailwindcss with this project: [Y/n]",
    },
  ];

  return inquirer.prompt(questions);
}

async function initializeProject() {
  console.log("Initializing project...");

  const answers = await promptUser();

  const packageManager = answers.packageManager;
  const reactRouterMode = answers.routerMode;
  const projectName = answers.projectName;
  const hasTailwindCss = answers.hasTailwindCss === "Y";

  await createViteProject(projectName, packageManager);
  await generateStructure(reactRouterMode, packageManager, hasTailwindCss);
}

initializeProject().catch(console.error)
