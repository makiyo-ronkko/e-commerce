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
router.post('/admin/products/new', upload.single('image'), [requireTitle, requirePrice], async (req, res) => {// multer middleware: upload.single('image')
    // express-validator error check
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send(productsNewTemplate({ errors }));
    }

    //console.log(errors);
    //console.log(req.body);

    //console.log(req.file.buffer.toString('base64'));//req.file=fieldname, originalname, encoding, mimetype, buffer, size
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.send('submitted');
});

module.exports = router;