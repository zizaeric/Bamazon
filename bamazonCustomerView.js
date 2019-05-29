// Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create MySQL Connection
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MyNewPass",
    database: "bamazon"
});

// Initialize Connection
connection.connect(function(err) {
    if (err) {
        console.error("error connected: " + err.stack);
    }
    console.log("Connection successful!");
})


