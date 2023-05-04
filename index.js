const express = require('express');
const inquirer = require('inquirer');
const mysql = require(`mysql2`);
// const db = require('./config/connection.js');
require(`console.table`);


const PORT = process.env.PORT || 3001;



const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );



function init() {
inquirer.prompt([
    {
        type: "list",
        name: "choice",
        message: "Choose your option",
        choices: [
            "View All Department",
            "View All Role",
            "View All Employee",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Exit"
        
        ]
    }
])
.then(result => {
    switch (result.choice) {
        case "View All Department":
            getAllDepartment()
            break;
            case "View All Role":
            getAllRole()
            break;
            case "View All Employee":
            getAllEmployee()
            break;
            case "Add a Department":
            addDepartment()
            break;
            case "Add a Role":
            addRole()
            break;
            case "Add an Employee":
            console.log("dogs!");
            addEmployee()
            console.log("cats!");
            break;
            case "Update Role":
            updateRole()
            break;
            case "Exit":
            exitApp();
            console.log("Goodbye!");
            break;
    }
})



function getAllDepartment() {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}
function getAllRole() {
    db.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}
function getAllEmployee() {
    db.query('SELECT * FROM employees', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}
}

// add Inquirer Questions to these functions
function addDepartment() {
    inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `What is the name of the department you would like to add?`
        }
    ]).then((data)=>{
        // add to database table
        db.query(`INSERT INTO departments (name) VALUES (?)`, [`${data.name}`], function (err, results) {
            console.log(``);
            console.log(`New Department Added!`);
        });
        init()
    })
}


const addRole = ()  => {
    const departmentsArr = [];
    db.query(`SELECT name FROM departments`, function (err, results) {
    for (i = 0; i < results.length; i++) {
        departmentsArr.push(results[i]['name'])
    }
});
inquirer.prompt([
    {
        type: `input`,
        name: `title`,
        message: `What is the job title for this role?`
    },
    {
        type: `input`,
        name: `salary`,
        message: `What is the salary for this position?`
    },
    {
        type: `list`,
        name: `department`,
        message: `What department is this role assigned to?`,
        choices: departmentsArr
    }
]).then((data)=>{
    db.query(`SELECT id FROM departments WHERE name=?`,[data.department], function (err, depResults) {
        console.log(depResults[0].id);
        db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)`,[`${data.title}`,`${data.salary}`,`${depResults[0].id}`], function (err, newRole) {
            console.log(`New Role Added!`);
            init();
        });
    });
});
    }

    function addEmployee() {
        const rolesArr = [];
        db.query(`SELECT title FROM roles`, function (err, results) {
            for (i = 0; i < results.length; i++) {
                rolesArr.push(results[i]['title'])
                console.log("hello")
            }
        });
        db.query(`SELECT CONCAT (first_name," ",last_name) FROM employees AS Name`, function (err, results) {
            const employeesArr = [];
            console.log(results)
            for (i = 0; i < results.length; i++) {
                employeesArr.push(results[i][`CONCAT (first_name," ",last_name)`])
            }
            inquirer.prompt([
                {
                    type: `input`,
                    name: `firstName`,
                    message: `What is this employee's first name?`
                },
                {
                    type: `input`,
                    name: `lastName`,
                    message: `What is this employee's last name?`
                },
                {
                    type: `list`,
                    name: `role`,
                message: `What is this employee's job title (role)?`,
                choices: rolesArr
            },
            {
                type: `list`,
                name: `manager`,
                message: `Who is this employee's manager?`,
                choices: employeesArr
            }
        ]).then((data)=>{
            db.query(`SELECT id FROM roles WHERE title=?`,[data.role], function (err, roleResults) {
                console.log(roleResults[0].id);
                db.query(`SELECT id FROM employees WHERE CONCAT (first_name," ",last_name)=?`,[data.manager], function (err, managerResults) {
                    console.log(managerResults[0].id);
                    db.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`, [`${data.firstName}`,`${data.lastName}`,`${roleResults[0].id}`,`${managerResults[0].id}`], function (err, results) {
                        console.log(``);
                        console.log(data.firstName, data.lastName, roleResults[0].id, managerResults[0].id)
                        console.log(`New Employee Added!`);
                        init();
                    });
                });
            });
        });
    })
}
function updateRole() {
    db.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err
        console.table(res)
        init()
    })
}

init()
function exitApp() {
    return process.exit()
}