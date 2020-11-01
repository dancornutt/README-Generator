let inquirer = require("inquirer");
let fs = require("fs");
const fileName = "README.md";
// let dataObj = {};

//Common licenses for projects
const licenses = {
    "MIT": "[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)",
    "Apache": "[![License](https://img.shields.io/badge/License-Apache%202.0-yellowgreen.svg)](https://opensource.org/licenses/Apache-2.0)",
    "GNU": "[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)",
    "BSD": "[![License](https://img.shields.io/badge/License-BSD%203--Clause-orange.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    "Creative Commons": "[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](http://creativecommons.org/licenses/by/4.0/)",
    "None": "None",
};

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
        choices: Object.keys(licenses)
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



// function to write README file to disk
function writeToFile(readmeObj) {
    let keys = Object.keys(readmeObj);
    keys.forEach(key => {
        let section = readmeObj[`${key}`] + "\n";
        console.log("Adding section:", section);
        fs.appendFile(fileName, section, function(err) {
            if (err){
                return console.log(err)
            };
        });
        
    });
    // fs.appendFile(fileName, `${data}\n`, function(err) {
    //     if (err){
    //         return console.log(err)
    //     };
    // });
}

// function to initialize program
function init() {
    //initializes readme file
    fs.writeFile(fileName, "", function(err) {
            if (err){
                return console.log(err)
            };
        });

    //Builds object of user responses
    inquirer.prompt(questions)
        .then( function(response) {
            // fs.writeFile("README.md", stringMe(response), function(err) {
            //     if (err){
            //         return console.log(err)
            //     };
            //     console.log("success!")
            // })
            console.log("Finished asking user questions, response is :", response);
            buildReadme(response);
        })
        
}

//Generates readMeDoc Object
function buildReadme(response) {
    console.log("about to make doc, response is :", response);
    let doc = {
intro:
`# ${response.projectName}

## Description

${response.description}`,
toc:
`
Table of Contents:
* [Description](##description)
* [Installation](##installation)
* [Usage](##usage)
* [License](##license)
* [Contributing](##contributing)
* [Tests](##tests)
* [Questions](##questions)
`,
install: 
`## Installation

to install necessary dependencies run the following command:
...
${response.dependenciesCmd}
...`,
usage: 
`## Usage

${response.repoKnow}`,
license:
`## License

This project is licensed under the ${licenses[response.license]} license.`,
contributing:
`## Contributing

${response.repoContribute}`,
tests:
`## Tests

To run tests use command: ${response.testsCmd}`,
questions:
`## Questions

Created by Github User: [${response.username}](https://github.com/${response.username}) who can be reached via email at: ${response.email}
`
};
if (response.license === 'None'){
    doc.license = 
`## License #license

This project has no license.`
    };
    //write doc to disk
    console.log("Finished makeing doc:", doc);
    writeToFile(doc);
}

// function call to initialize program
init();
