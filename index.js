const express = require('express');

const app = express();

// root router
app.get('/', (req, res) => {
    // name property indicates what to call in each input
    res.send(`
    <div>
      <form method="POST">
        <input name="email" placeholder="email" />
        <input name="password" placeholder="password" />
        <input name="passwordConfirmation" placeholder="password confirmation" />
        <button>Sign up</button>
      </form>
    </div>
    `);
});


// bodyParser is a middleware function
// next is a callback function which is app.post('/', bodyParser, (req, res) => {}
const bodyParser = (req, res, next) => {
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
};

app.post('/', bodyParser, (req, res) => {
    //get access to email, password, passwordConfirmation
    console.log(req.body);
    res.send('Account created');
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