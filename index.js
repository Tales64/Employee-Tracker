import inquirer from'inquirer';
import db from './config/connection.js'


const PORT = process.env.PORT || 3001;

function start() {
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
            case "Add a Employee":
            addEmployee()
            break;
            case "Update Role":
            updateRole()
            break;
            default:
            exitApp();
    }
})



function getAllDepartment() {
    db.promise().query("SELECT * FROM departments")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
function getAllRole() {
    db.promise().query("SELECT * FROM roles")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
function getAllEmployee() {
    db.promise().query("SELECT * FROM employees")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
}

// add Inquirer Questions to these functions
function addDepartment() {
    inquirer.prompt([{
        type: 'input',
        message: 'please enter name for new department',
        name: 'department'
    }]).then(data => {
        db.query(`INSERT INTO departments (name)
    VALUES ("${data.department}");`)
    .then(result => console.log(result))
    .catch(err => console.log(err))
})
}


function addRole() {
    inquirer.prompt([{
    type: 'input',
    message: 'please enter name for new role',
    name: 'role'

}, {
    type: 'input',
    message: 'what is the salary for this role',
    name: 'salary'
}, {
    type: 'list',
    message: 'what department id is this role in',
    name: 'department_id',
    choices: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}
]).then(data => {
    db.query(`INSERT INTO roles (title, salary)
    VALUES ("${data.role},${data.salary},${data.department}");`) 
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
)}

function addEmployee() {
    inquirer.prompt([{
        type: 'input',
        message: 'please enter first name of new employee',
        first: `first_name`,
    }
    ,{
        type: 'input',
        message: 'please enter last name of new employee',
        last: `last_name`,
    }]).then(data => {
        db.query(`INSERT INTO employees (first_name, last_name)
    VALUES ("${data.first},${data.last}");`)
    .then(result => console.log(result))
    .catch(err => console.log(err))
})
}


function exitApp() {
    return process.exit()
}