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
    displayInventory();
})


function displayInventory() {
	// console.log('___ENTER displayInventory___');

	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Existing Inventory: ');
		console.log('...................\n');

		var strOut = '';
		for (var i = 0; i < data.length; i++) {
			strOut = '';
			strOut += 'Item ID: ' + data[i].item_id + '  //  ';
			strOut += 'Product Name: ' + data[i].product_name + '  //  ';
			strOut += 'Department: ' + data[i].department_name + '  //  ';
			strOut += 'Price: $' + data[i].price + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

	  	//Prompt the user for item/quantity they would like to purchase
	  	promptUserPurchase();
	})
}
