const express = require('express');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');

const router = express.Router();

// list out products via administrator view
router.get('/admin/products', (req, res) => {

});

// create a new product
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({

    }));
});

module.exports = router;