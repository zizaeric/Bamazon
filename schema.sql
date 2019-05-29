DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER(40) NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Retro Patio Set", "Outdoor Patio Garden", 119.99, 210),
("Similac infant formula", "baby and toddler", 33.12, 593),
("Stanley Fatmax Pawer Station", "Auto and Tires", 69.98, 24),
("Atlantic Phoenix Gaming Hub", "Toys and Games", 64.88, 48),
("14 karat White Gold Diamond Necklate", "Jewelry", 220.00, 12),
("Skywalker Batting Cage", "Sports and Fitness", 799.98, 5),
("Reid Accent Floor Lamp", "Home Furnishings", 74.88, 32),
("Vera Wang Rock Princess 2 Parfume", "Jewelry", 35.98, 65),
("Lumabone Durable Chew Toys", "Pet Supplies", 12.91, 344),
("Outdoor Storage Shed", "Outdoor Patio Garden", 1649.00, 9);

select * from bamazon.products;