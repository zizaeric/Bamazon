# Bamazon Customer View
Bamazon is an Amazon-like storefront node.js CLI application that uses the inquirer and MySQL npm packages to input and store data.

## What can you do with Bamazon Customer View
  1. Bamazon customer view allows customers to place orders, and 
  2. Depletes inventory as orders are placed.
  
## How it work
  1. Type: 
  `node bamazonCustomerView.js` and press enter (must do npm install first).

  2. You'll see a welcome to Bamazon message and a prompt asking what you'd like to do.
  
  **Welcome message and initial prompt**
  
  ![Welcome message and initial prompt](./Bamazon/images/welcomeMessageAndPrompt.png);
    * use arrow up or arrow down to select your answer,
    (you may also use numbers 1 or 2)

    * once you've highlighted your choise press enter.
        * Choice 1) Buy something _ takes you inside Bamazon

        * Choice 2) Exit Bamazon _ terminated the connection and displays a goodbye message.
          **Exit Bamazon Screenshot**
          ![Exit Bamazon](./Bamazon/images/exitBamazon.png);
### Once inside Bamazon
The screenshots below take you through Bamazon functionality after chosing to buy something.
  1. **Buy something**
  After selecting to buy something a table of all available products is displayed.
  ![Buy something](./Bamazon/images/buySomething.png);

  2. **Enter Item ID**
  A prompt for an item ID of a product the user would like to buy prints right below the table of avaible products.
    * Only accepts numbers between 1 and 10.
    * user is prompted to enter an ID number between 1 and 10 if Null, NaN, 0, or a number greater than 10 is entered for Item ID.
  ![Enter Item ID](./Bamazon/images/enterItemId.png);

  3. **How Many Units**
  Once an acceptable Item Id is entered in the Item ID Prompt the user is prompted for the number of items they'd like to buy.
    * Only accepts numbers.
    * The prompt is repeated if user response is Null, NaN, or 0.
  ![Quantity prompt](./Bamazon/images/quantityPrompt.png);

  4. **Order quantity exceeds stock inventory**
  When the quantity requested for a given order exceeds the available quantity the user is told how many units of that item are available and given the option to buy or exit.
  ![Not enough in stock](./Bamazon/images/notEnoughInStock.png);

  5. **Successful purchase**
  When the user selects an available item in available quantity we have a successful sale. The user gets a summary of the transaction: 
    * Quantity purchased,
    * Name of product purchased,
    * Total cost for the order,
  along with a thank you note.

  The user is then asked what they'd like to do next, continue shopping or exit Bamazon.
  ![Successful Sale](./Bamazon/images/successulSale.png);

  6. **Database updated after purchase**
  The database is updated after each successful transaction to reflect available quantities.
  ![Item ID 6 initial count](./Bamazon/images/databaseInitialCount.png);
  ![Item ID 6 transaction](./Bamazon/images/itemIdSixTransaction.png);
  ![Item ID 6 final count](./Bamazon/images/databaseFinalCount.png);



