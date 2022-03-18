# Terminal Food App

This project is a terminal food app like McDonald's Terminals made in React.

In this app there will be 3 control terminals that will be in constant use, of this fact, everything is in real time, when a product has been ordered, it is sent to the kitchen. If a product is ordered, it has an impact on stocks of a food. This food will be more available in stock, all terminals are notified and removes all products from sale in real time. If more than 3 people are connected the following people will be waiting.

You can find more images in the screenshots section !

## Documentation

Here are the different functionnalities :

- As a customer, I am able to see all the products available when the quantity allows.

- As a customer, I am able to put a product in my basket.

- As a customer I am able to customize a product (remove ingredients) and the put in my basket.

- As a customer I am able to create my own product via food and put it in my basket.

- As a customer, I am able to view my shopping cart.

- As a customer, I am able to delete a product from my cart.

- As a customer, I am able to modify the food in my cart.

- As a customer, I am able to change the quantity of a product in my cart.

- As a customer, I am able to turn my shopping cart into an order.

- As a customer, I am notified when a product is no longer available because the quantity of ingredients has reached zero.

- As a customer I am able to receive an e-mail (if my e-mail is specified) with the summary of my order as a receipt, with the order number, the price of the order, products of my order, time ect…

- In the kitchen, the user is able to see all orders that are not "delivered"

- In the kitchen, the user is able to change the status of an order

- In the kitchen, the user is able to see the details of an order (ingredients, time since the creation of the command with a timer, ect...)

- As an administrator I am able to see my product list
- As an administrator I am able to add a product
- As an administrator I am able to modify a product
- As an administrator I am able to delete a product
- As an administrator I am able to add an ingredient
- As an administrator I am able to modify an ingredient
- As an administrator I am able to delete an ingredient
- As an administrator I am able to see the list of commands
- As an administrator I am able to have statistics on all my products (the most sold, the one with the most money)
- As an administrator I am able to be notified on the site + by e-mail that an ingredient is no longer in stock
- As an administrator I am able to see orders coming in real time + all stocks of products that update in real time according to orders

## Screenshots

### Start Terminal Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056382-266d6b49-30d3-4cb5-93ab-81de12127142.png)

### Accounts Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056407-993e7d81-04bd-4185-8ce4-da861b0305f4.png)

### User Login Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056420-00db3547-4005-4bce-8b88-017083227648.png)

### Shopping Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056457-236458ba-214e-4bce-a694-b2e6a44b0ba1.png)

### Product Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056485-2b147420-ba87-499c-850d-a71fb033983e.png)

### Cart Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056535-cc44a5f2-bfa4-41d5-ba06-defc1bd9cae5.png)

### Create Product Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056557-ed1ac2d5-969e-47de-8e7d-071f395e8b2c.png)

### Success Checkout Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056595-249a2063-4e07-4dd3-80ff-cf01729facd1.png)

### Kitchen Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056640-9965baaf-bbaa-422b-a696-4cb41cb173d6.png)

### Kitchen Details Order Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056659-d0826acf-0f52-46d6-8eff-9500755803a8.png)

### Admin Login Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056743-28537dc5-20ba-495d-9109-b9181bd28e61.png)

### Admin Dashboard Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056759-9f60468f-2719-43f8-973a-26a7ee1db288.png)

### Admin Products Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056778-ea46adca-b1af-4ab9-9f5d-e1e287ebdb26.png)

### Admin Ingredients Page

![App Screenshot](https://user-images.githubusercontent.com/73486687/159056799-53d3de89-c5e5-4906-b1af-465fe24b846e.png)

## Installation

You can test it locally

```bash
  git clone https://github.com/Ulysseassoo/Terminal-Food-App.git
  cd client
  yarn dev
  cd ../server
  yarn fixtures
  yarn dev
```

You need to have docker and mailhog installed to test it.

I will provide the dockerFile later on.

## Authors

- [@Ulysseassoo](https://github.com/Ulysseassoo)
