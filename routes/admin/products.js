const express = require('express');
const { validationResult } = require('express-validator');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();

// list out products via administrator view
router.get('/admin/products', (req, res) => {

});

// create a new product
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({

    }));
});

// product submission
router.post('/admin/products/new', [requireTitle, requirePrice], (req, res) => {
    // express-validator error check
    const errors = validationResult(req);
    console.log(errors);
    res.send('submitted');
});

module.exports = router;