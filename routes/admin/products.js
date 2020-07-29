const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// list out products via administrator view
router.get('/admin/products', (req, res) => {

});

// create a new product
router.get('/admin/products/new', (req, res) => {
    res.send(productsNewTemplate({

    }));
});

// product submission
router.post('/admin/products/new', [requireTitle, requirePrice], upload.single('image'), (req, res) => {
    // express-validator error check
    const errors = validationResult(req);
    //console.log(errors);
    //console.log(req.body);
    // 

    console.log(req.file);//fieldname, originalname, encoding, mimetype, buffer, size
    res.send('submitted');
});

module.exports = router;