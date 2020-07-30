const express = require('express');
//const { validationResult } = require('express-validator');
const multer = require('multer');

// import middleware of validationResult
const { handleErrors, requireAuth } = require('./middlewares');
const productsRepo = require('../../repositories/products');
const productsNewTemplate = require('../../views/admin/products/new');
const productsIndexTemplate = require('../../views/admin/products/index');
const { requireTitle, requirePrice } = require('./validators');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// list out products via administrator view
router.get('/admin/products', requireAuth, async (req, res) => {
    // replaced by middleware(requireAuth)
    // if (!req.session.userId) {
    //     return res.redirect('/signin');
    // }
    const products = await productsRepo.getAll();
    res.send(productsIndexTemplate({ products }));
});

// create a new product
router.get('/admin/products/new', requireAuth, (req, res) => {
    res.send(productsNewTemplate({

    }));
});

// product submission
router.post('/admin/products/new', requireAuth, upload.single('image'), [requireTitle, requirePrice], handleErrors(productsNewTemplate), async (req, res) => {// multer middleware: upload.single('image')

    // *replaced by handleErrors 
    // express-validator error check
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.send(productsNewTemplate({ errors }));
    // }

    //console.log(errors);
    //console.log(req.body);

    //console.log(req.file.buffer.toString('base64'));//req.file=fieldname, originalname, encoding, mimetype, buffer, size
    const image = req.file.buffer.toString('base64');
    const { title, price } = req.body;

    await productsRepo.create({ title, price, image });

    res.redirect('/admin/products');
});

module.exports = router;