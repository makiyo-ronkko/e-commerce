const express = require('express');
const cartsRepo = require('../repositories/carts');

const router = express.Router();

// Receive a post request to add an item to a cart
router.post('/cart/products', async (req, res) => {
    //console.log(req.body.productId);
    // Figure out the ...
    // No cart exists yet, create a new one
    let cart;
    if (!req.session.cartId) {
        cart = await cartsRepo.create({ items: [] });
        // and store the card id to the req.session.cartId property
        req.session.cartId = cart.id;
    } else { // cart exists, get it fro the repository
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    //console.log(cart); //{ items: [], id: '70ee6412' }

    const existingItem = cart.items.find(item =>
        item.id === req.body.productId // return true
    );
    if (existingItem) {
        // increment quantity and save cart
        existingItem.quantity++;
    } else {
        // add new product id to items array
        cart.items.push({ id: req.body.productId, quantity: 1 });
    }
    //save data to record
    await cartsRepo.update(cart.id, {
        items: cart.items
    });

    console.log(cart);

    res.send('Product added to cart');
})

// Receive a GET request to show all items in cart

// Receive a post request to delete an item from a cart


module.exports = router;