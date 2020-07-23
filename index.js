const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const usersRepo = require('./repositories/users');

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

// root router
app.get('/signup', (req, res) => {
    // name property indicates what to call in each input

    res.send(`
    <div>
    Your id is: ${req.session.userId}
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign up</button>
      </form>
    </div>
    `);

});

app.post('/signup', async (req, res) => {//cookieSession to req
    //get access to email, password, Confirmation
    //console.log(req.body);// form inputs
    const { email, password, passwordConfirmation } = req.body;

    const existingUser = await usersRepo.getOneBy({ email: email });
    if (existingUser) {
        return res.send('Email in use');
    }
    if (password !== passwordConfirmation) {
        return res.send('Password must match');
    }

    //Create a user in our user repo to represent this person
    const user = await usersRepo.create({ email, password });

    // Store the id of that user inside the users cookie
    // req.session === {} added by cookie session
    // userId can be any name
    req.session.userId = user.id; //encrypted(暗号化)

    res.send('Account created!');
});

app.get('/signout', (req, res) => {
    req.session = null;
    res.send('You are logged out');
});

app.get('/signin', (req, res) => {
    res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
`);
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersRepo.getOneBy({ email });

    if (!user) {
        return res.send('Email not found');
    }
    if (user.password !== password) {//password from input
        return res.send('Invalid password');
    }
    // Store the id of that user inside the users cookie
    req.session.userId = user.id;
    res.send('You are signed in');
});

app.listen(3000, () => {
    console.log('Listening...');
});


/*
Without Express Middleware
*/
/* app.post('/', (req, res) => {
    //get access to email, password, passwordConfirmation
    req.on('data', data => {//on = addEventListener 'data' event
        //console.log(data.toString('utf8'));
        // return <Buffer> is an array contains raw info
        const parsed = data.toString('utf8').split('&');
        const formData = {};
        for (let pair of parsed) {
            const [key, value] = pair.split('=');
            formData[key] = value;
        }
        console.log(formData);
    });
    res.send('Account created');
}); */

// bodyParser is a middleware function
// next is a callback function which is app.post('/', bodyParser, (req, res) => {}
/* const bodyParser = (req, res, next) => {
    if (req.method === 'POST') {
        req.on('data', data => {//on = addEventListener 'data' event
            // return <Buffer> is an array contains raw info
            const parsed = data.toString('utf8').split('&');
            const formData = {};
            for (let pair of parsed) {
                const [key, value] = pair.split('=');
                formData[key] = value;
            }
            req.body = formData;
            next();
        });
    } else {
        next();
    }
}; */

/* app.post('/', bodyParser.urlencoded({ extended: true }), (req, res) => {
    //get access to email, password, Confirmation
    console.log(req.body);
    res.send('Account created');
}); */