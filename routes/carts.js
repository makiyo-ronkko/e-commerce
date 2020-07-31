const express = require('express');
const cartsRepo = require('../repositories/carts');
const productsRepo = require('../repositories/products');
const cartShowTemplate = require('../views/carts/show');

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

    res.redirect('/cart');
})

// Receive a GET request to show all items in cart
router.get('/cart', async (req, res) => {
    if (!req.session.cartId) {
        // if no cart id tied to user redirect
        return res.redirect('/');
    }
    const cart = await cartsRepo.getOne(req.session.cartId);
    for (let item of cart.items) {
        // item ==={id: e23dfs, quantity: 1}
        const product = await productsRepo.getOne(item.id);
        // take eintire item data from ProductsRepo
        // and assign to product :{id: 123, title:...}
        // to cart Repository as object
        item.product = product;
    }
    res.send(cartShowTemplate({ items: cart.items }));
});

// Receive a post request to delete an item from a cart
router.post('/cart/products/delete', async (req, res) => {
    //console.log(req.body.itemId);
    const { itemId } = req.body;
    const cart = await cartsRepo.getOne(req.session.cartId);
    // return boolean, true
    const items = cart.items.filter(item => item.id !== itemId);// item.id is from we're iterating over, itemID is from req.body
    await cartsRepo.update(req.session.cartId, { items });

    // respond to user
    res.redirect('/cart');
});

module.exports = router;