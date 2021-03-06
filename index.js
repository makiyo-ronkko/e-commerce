const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
// const usersRepo = require('./repositories/users');
const authRouter = require('./routes/admin/auth');
const adminProductsRouter = require('./routes/admin/products');
const productsRouter = require('./routes/products');
const cartsRouter = require('./routes/carts');

const app = express();
const port = process.env.PORT || 3000;

// tell express to look at public folder and open to public views
app.use(express.static('public'));

// urlencoded to handle html form
// Automatically detect if bodyParse requred and apply
app.use(bodyParser.urlencoded({ extended: true }));

// wire up cookieSession
// keys random charactors and encrypted(暗号化)
// adding extra object to req as argument
app.use(cookieSession({ // pass config object
    keys: ['catsdogs']
}));

//wire up routers
app.use(authRouter);
app.use(adminProductsRouter);
app.use(productsRouter);
app.use(cartsRouter);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});


