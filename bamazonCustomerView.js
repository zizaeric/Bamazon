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
// Asks user what they'd like to do and offers two options
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
        }
        console.log(table.toString());
        promptUserPurchase();
	});
}

//------------------------- promptUserPurchase() ----------------------------
// Asks user for Id number of the item they'd like to purchse and quantity

function promptUserPurchase() {
    inquirer.prompt([
        {
            type: "input",
            name: "item_id",
            message: "Please enter the ID of the item you want to buy.",
            validate: function(val) {
                if (isNaN(val) === false && val > 0 && val <= 10) {
                    return true;
                } else {
                    console.log("\n\nPlease enter a number between 1 and 10 for Item ID.");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "quantity",
            message: "\nHow many units would you like to buy?",
            validate: function(val) {
                if (isNaN(val) === false && val > 0) {
                    return true;
                } else {
                    console.log("\n\nPlease enter a number for quantity.");
                    return false;
                }
            }
        }
    ]).then(function(itemAndQuantity) {
        // console.log(itemAndQuantity);
        var queryStr = "SELECT * FROM products WHERE item_id = ?";
        connection.query(queryStr, itemAndQuantity.item_id, function(err, res) {
            var purchasedItem = res[0];
            if (err) throw err;
            // console.log(res[0]);
            // console.log(itemAndQuantity.quantity);
            // console.log(res[0].stock_quantity);
            if (itemAndQuantity.quantity > purchasedItem.stock_quantity) {
                console.log("Sorry, the most we have of that item is: " + purchasedItem.stock_quantity);
                welcomeToBamazon();
                return;
            }
            fulfillCustomerOrder(itemAndQuantity, purchasedItem);
        });
    });
}

//------------------------ fulfillCustomerOrder -----------------------------
// Updates SQL database to reflect remaining quantities and shows customer total cost of purchase

function fulfillCustomerOrder(itemAndQuantity, purchasedItem) {
    // console.log(itemAndQuantity);
    // console.log(purchasedItem);
    var queryStr = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?";
    connection.query(queryStr, [itemAndQuantity.quantity, itemAndQuantity.item_id], function(err, res) {
        //  console.log(res);
         console.log("\nThank you for shopping with us. \nYou have successfully purchased " + itemAndQuantity.quantity + " " + purchasedItem.product_name + " units." + "\nYour total is $" + purchasedItem.price * itemAndQuantity.quantity + ".\n");
         welcomeToBamazon();
     });
}
