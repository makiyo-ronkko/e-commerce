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
        cart = await cartsRepo.create({
            items: [] // initially empty array
        });
        // and store the card id to the req.session.cartId property
        req.session.cartId = cart.id;
    } else { // cart exists, get it fro the repository
        cart = await cartsRepo.getOne(req.session.cartId);
    }
    console.log(cart);

    // Either increment quantity for existing product

    // OR add new product to items array


    res.send('Product added to cart');
})

// Receive a GET request to show all items in cart

// Receive a post request to delete an item from a cart


module.exports = router;