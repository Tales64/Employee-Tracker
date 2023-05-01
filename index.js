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
        ]
    }
])
.then(result => {
    switch (result.choice) {
        case "View All Department":
            getAllDept()
            break;
            case "View All Role":
            getAllRole()
            break;
            case "Update Role":
            updateRole()
            break;
        default:
            exitApp();
    }
})



function getAllDept() {
    db.promise().query("SELECT * FROM department")
    .then(result => console.log(result))
    .catch(err => console.log(err))
}

function exitApp() {
    return process.exit()
}