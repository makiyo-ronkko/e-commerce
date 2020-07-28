const layout = require('../layout');

const getError = (errors, prop) => {
    // prop === 'email' || 'password' || 'passwordConfirmation'
    if (errors) {
        try {
            // return errors array into object
            return errors.mapped()[prop].msg
            // erros.mapped ==={
            //     email:{msg: 'Invalid Email},
            //     password:{msg: 'Password too short'}, 
            //     passwordConfirmation:{msg: 'Passwords     must match}
            // }
        } catch (err) {
            return '';
        }
    };
}
// errors: [
//     {
//       value: '123456',
//       msg: 'Invalid value',
//       param: 'passwordConfirmation',
//       location: 'body'
//     }
//   ]

module.exports = ({ req, errors }) => {
    return layout({
        content: `
    <div>
        Your id is: ${req.session.userId}
          <form method="POST">
            <input name="email" placeholder="email" />
            ${getError(errors, 'email')}
            <input name="password" placeholder="password" />
            ${getError(errors, 'password')}
            <input name="passwordConfirmation" placeholder="password confirmation" />
            ${getError(errors, 'passwordConfirmation')}
            <button>Sign up</button>
          </form>
        </div>
    `});
};