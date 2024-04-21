#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let todoList = [];
console.log(chalk.magenta.bold("\n \t WELLCOME TO YOUR'S - TODO LIST - APPLICATION \n"));
let condition = true;
let main = async () => {
    while (condition) {
        let option = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.green("Select an option"),
                choices: ["ADD", "UPDATE", "VIEW", "DELETE", "EXIT"],
            }
        ]);
        if (option.choice === "ADD") {
            await ADD();
        }
        else if (option.choice === "UPDATE") {
            await UPDATE();
        }
        else if (option.choice === "VIEW") {
            await VIEW();
        }
        else if (option.choice === "DELETE") {
            await DELETE();
        }
        else if (option.choice === "EXIT") {
            condition = false;
        }
    }
};
let ADD = async () => {
    let addTodo = await inquirer.prompt([
        {
            name: "todo",
            type: "input",
            message: chalk.green("Add items in the list"),
        }
    ]);
    todoList.push(addTodo.todo);
    console.log(chalk.magenta(`\n ${addTodo.todo} added successfully in todo list`));
};
let VIEW = () => {
    console.log(chalk.redBright("\n Your TODO-LIST: \n"));
    todoList.forEach((todo, index) => {
        console.log(chalk.red(`${index + 1}: ${todo}`));
    });
    console.log("\n");
};
let DELETE = async () => {
    await VIEW();
    let taskIndex = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.redBright("Enter the 'index no.' of the task you want to delete :"),
        }
    ]);
    let DELETE = todoList.splice(taskIndex.index - 1, 1);
    console.log(chalk.greenBright(`\n ${DELETE} this task has been deleted successfully from your Todo-List`));
};
let UPDATE = async () => {
    await VIEW();
    let UPDATE_index = await inquirer.prompt([
        {
            name: "index",
            type: "number",
            message: chalk.cyan("Enter the 'index no' if you want update the TodoList :")
        },
        {
            name: "new_task",
            type: "input",
            message: chalk.yellowBright("Please enter the new task name :"),
        }
    ]);
    todoList[UPDATE_index.index - 1] = UPDATE_index.new_task;
    console.log(chalk.blue(`\n Task at index no. ${UPDATE_index.index - 1} updated successfully [For updated list check option:|"View Todo-list"]`));
};
main();
