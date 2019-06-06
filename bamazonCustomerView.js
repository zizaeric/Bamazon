// Require npm packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
    console.log("~~~~~~~~~~~~~~~ Welcome to Bamazon! ~~~~~~~~~~~~~~~");
    welcomeToBamazon();
})

//--------------------------- Bamazon Functions -----------------------------

//----------------- welcomeToBamazon -----------------------------------------
function welcomeToBamazon() {
    var welcomeMessagePrompt = [
        {
            type: "rawlist",
            name: "action",
        message: "\nWhat would you like to do?",
            choices: [
                "Buy something",
                "Exit Bamazon"
            ]
        }
    ]
    inquirer.prompt(welcomeMessagePrompt).then(function(answer){
        switch (answer.action) {
            case "Buy something":
                console.log("\nHere are the products we have available.");
                displayAvailableItems();
                break;

            case "Exit Bamazon":
                console.log("Come again soon! \nBye Bye!")
                connection.end();
                break;
        }

    });
}
//------------------------ displayAvailableItems() --------------------------
// Displays all items available for sale in a neat table

function displayAvailableItems() {

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, res) {
        if (err) throw err;
        
        // CLI table
        var table = new Table({
            head: ['Item ID', 'Product Name', 'Price']
          , colWidths: [10, 40, 15]
        });

        // Populate table with values from the response res
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].item_id, res[i].product_name, "$" + res[i].price]
            );
        };
        console.log(table.toString());

	})
}
