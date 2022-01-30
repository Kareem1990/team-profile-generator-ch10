const inquirer = require("inquirer");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

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

const promptEmployee = (employeeAnswers)  => {

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
          choices: ["engineer", "intern", "finish building my team"],
        },
      ])
      .then((answer) => {
        //console.log(answer, answer.choice);
        if (answer.choice == "engineer") {
          return inquirer
            .prompt([
              {
                type: "input",
                name: "engineer_name",
                message: "Enter the engineer's name?",
              },
              {
                type: "input",
                name: "engineer_empid",
                message: "Provide the engineer's employee ID:",
              },
              {
                type: "input",
                name: "engineer_email",
                message: "Provide the engineer's email address:",
              },
  
              {
                type: "input",
                name: "github",
                message: "Enter the engineer's GitHub Username",
              },
  
              {
                type: "confirm",
                name: "confirmAddEmployee",
                message: "Would you like to enter another employee?",
                default: false,
              },
            ])
            .then((engineerData) => {
              const engineer = new Engineer(
                engineerData.engineer_name,
                engineerData.engineer_empid,
                engineerData.engineer_email,
                engineerData.github
              );
              employeesGroup.push(engineer);

              if (engineerData.confirmAddEmployee) {
                return promptEmployee(employeeAnswers);
              } else {
                let htmlfile = generatePage(employeesGroup);
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
            .then((internData) => {
              const intern = new Intern(
                internData.intern_name,
                internData.intern_empid,
                internData.intern_email,
                internData.school
              );
  
              employeesGroup.push(intern);
  
              if (internData.confirmAddEmployee) {
                return promptEmployee(employeeAnswers);
              } else {
                let htmlfile = generatePage(employeesGroup);
                writeToFile("./dist/index.html", htmlfile);
              }
            });
        } else {
          console.log(employeeAnswers);
          let htmlfile = generatePage(employeesGroup);
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
        employeeAnswers.manager_office
    );
    employeesGroup.push(manager);
    promptEmployee();
  });