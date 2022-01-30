const inquirer = require("inquirer");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const { writeFile } = require("./utils/generate-page.js");
const generateForm = require("./src/generateForm");

const employeesGroup = [];

const promptManager = () => {
    return inquirer.prompt([

        {
            type: "input",
            name: "manager-name",
            message: "What is the team manager name?",
        },
        {
            type: "input",
            name: "manager-id",
            message: "What is the team manager id?",
        },
        {
            type: "input",
            name: "manager-email",
            message: "What is the manager email?",
        },
        {
            type: "input",
            name: "manager-officeNumber",
            message: "What is the manager office number?",
        },

    ])

};

const promptEmp = (employeeAnswers)  => {

    console.log(`
    ==================
    Add a New Employee
    ==================
    `);
    return inquirer
      .prompt([
        {
          type: "list",
          name: "choice",
          message: "Would you like to add the following employee or finish?",
          choices: ["engineer", "intern", "no more employees"],
        },
      ])
      .then((answer) => {
        if (answer.choice == "engineer") {
          return inquirer
            .prompt([
              {
                type: "input",
                name: "engineer-name",
                message: "Enter the engineer's name?",
              },
              {
                type: "input",
                name: "engineer-empid",
                message: "Provide the engineer's employee ID:",
              },
              {
                type: "input",
                name: "engineer-email",
                message: "Enter the engineer's email:",
              },
  
              {
                type: "input",
                name: "engineer-github",
                message: "Enter GitHub account",
              },
  
              {
                type: "confirm",
                name: "addEmployee",
                message: "Would you like to enter another employee?",
                default: false,
              },
            ])
            .then((engineerInfo) => {
              const engineer = new Engineer(
                engineerInfo.engineer_name,
                engineerInfo.engineer_empid,
                engineerInfo.engineer_email,
                engineerInfo.github
              );
              employeesGroup.push(engineer);

              if (engineerInfo.confirmAddEmployee) {
                return promptEmp(employeeAnswers);
              } else {
                let htmlfile = generateForm(employeesGroup);
                writeToFile("./dist/index.html", htmlfile);
              }
            });
        } else if (answer.choice == "intern") {
          return inquirer
            .prompt([
              {
                type: "input",
                name: "intern_name",
                message: "Enter the intern's name?",
              },
              {
                type: "input",
                name: "intern_empid",
                message: "Provide the intern's employee ID:",
              },
              {
                type: "input",
                name: "intern_email",
                message: "Provide the intern's email address:",
              },
  
              {
                type: "input",
                name: "school",
                message: "Enter the intern's school",
              },
              {
                type: "confirm",
                name: "confirmAddEmployee",
                message: "Would you like to enter another employee?",
                default: false,
              },
            ])
            .then((internInfo) => {
              const intern = new Intern(
                internInfo.intern_name,
                internInfo.intern_empid,
                internInfo.intern_email,
                internInfo.school
              );
  
              employeesGroup.push(intern);
  
              if (internInfo.confirmAddEmployee) {
                return promptEmp(employeeAnswers);
              } else {
                let htmlfile = generateForm(employeesGroup);
                writeToFile("./dist/index.html", htmlfile);
              }
            });
        } else {
          console.log(employeeAnswers);
          let htmlfile = generateForm(employeesGroup);
          writeToFile("./dist/index.html", htmlfile);
        }
      });
  };

  function writeToFile(fileName, data) {
    return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          message: "File created!",
        });
      });
    });
  }
  
  promptManager().then((employeeAnswers) => {
    const manager = new Manager(
        employeeAnswers.manager_name,
        employeeAnswers.manager_empid,
        employeeAnswers.manager_email,
        employeeAnswers.manager_office,

        console.log(employeeAnswers)
    );
    employeesGroup.push(manager);
    promptEmp();
  });