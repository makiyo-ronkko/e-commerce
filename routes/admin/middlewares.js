const { validationResult } = require('express-validator');

// validation steps into validationResult function
// validationResult from express-validator library
/* const errors = validationResult(req);
//console.log(errors);

if (!errors.isEmpty()) {// if error is not empty
    return res.send(signupTemplate({ req, errors }));
} */

module.exports = {
    // returning function in order to customize per use and apply different templates
    handleErrors(templateFunc, dataCb) {//data callback
        return async (req, res, next) => {// next is a reference to tell Express to continue excuting
            const errors = validationResult(req);

            if (!errors.isEmpty()) {//Returns: a boolean indicating whether this result object contains no errors at all. Do something if !errors.isEmpty() is true
                // dataCb function
                let data = {};
                if (dataCb) {
                    data = await dataCb(req);
                }
                return res.send(templateFunc({
                    errors, ...data
                }));
            }
            next();
        };
    },
    requireAuth(req, res, next) {
        if (!req.session.userId) {
            return res.redirect('/signin');
        }
        next();
    }
};