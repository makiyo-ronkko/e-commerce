const { validationResult } = require('express-validator');

module.exports = {
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
    }
};