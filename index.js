const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
// const usersRepo = require('./repositories/users');
const authRouter = require('./routes/admin/auth');

const app = express();


// urlencoded to handle html form
// Automatically detect if bodyParse requred and apply
app.use(bodyParser.urlencoded({ extended: true }));

// wire up cookieSession
// keys random charactors and encrypted(暗号化)
// adding extra object to req as argument
app.use(cookieSession({ // pass config object
    keys: ['catsdogs']
}));

app.use(authRouter);

app.listen(3000, () => {
    console.log('Listening...');
});


