import inquirer from'inquirer';
import db from './config/connection.js'


const PORT = process.env.PORT || 3001;

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


function addRole() {
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
    init()
})
}

init()
function exitApp() {
    return process.exit()
}