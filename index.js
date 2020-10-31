let inquirer = require("inquirer");
let fs = require("fs");

// array of questions for user
const questions = [
    {
        type: "input",
        message: "What is your GitHub username?",
        name: "username"
    },
    {
        type: "input",
        message: "What is your email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your project's name?",
        name: "projectName"
    },
    {
        type: "input",
        message: "Please write a short description of your project.",
        name: "description"
    },
    {
        type: "list",
        message: "What kind of license should your project have?",
        name: "license",
        choices: [
            "MIT",
            "None"
        ]
    },
    {
        type: "input",
        message: "What command should be run to install dependencies?",
        name: "dependenciesCmd"
    },
    {
        type: "input",
        message: "What command should be run to run tests?",
        name: "testsCmd"
    },
    {
        type: "input",
        message: "What does the user need to know about using the repo?",
        name: "repoKnow"
    },
    {
        type: "input",
        message: "What does the user need to know about contributing to the repo?",
        name: "repoContribute"
    },
];

// function to write README file
function writeToFile(fileName, data) {
}

// function to initialize program
function init() {
    // fs.writeFile("README.md");
    inquirer.prompt(questions)
        .then( function(response) {
            fs.writeFile("README.md", stringMe(response), function(err) {
                if (err){
                    return console.log(err)
                };
                console.log("success!")
            })
        })
}

//Creates new line string for file
function stringMe(data) {
    let myStr = "";
    for (let [key, value] of Object.entries(data)) {
        myStr = `${myStr} ${key}: ${value}`;
      }
    myStr = `${myStr}\n`
    return myStr;
  }

// function call to initialize program
init();
