const { validationResult } = require('express-validator');

module.exports = {
    // returning function in order to customize per use and apply different templates
    handleErrors(templateFunc) {
        return (req, res, next) => {// next is a reference to tell Express to continue excuting
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.send(templateFunc({
                    errors
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