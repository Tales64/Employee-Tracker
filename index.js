import inquirer from'inquirer';
import db from './config/connection.js'



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
        case '"View All Department"':
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
    db.promise().query("SELECT * FROM department")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
function getAllRole() {
    db.promise().query("SELECT * FROM role")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
function getAllEmployee() {
    db.promise().query("SELECT * FROM employee")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

function addDepartment() {
    db.promise().query(`INSERT INTO produce (id, name)
    VALUES (1, "apple");`)
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
function addRole() {
    db.promise().query("SELECT * FROM department")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}
function addEmployee() {
    db.promise().query("SELECT * FROM department")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

function exitApp() {
    return process.exit()
}