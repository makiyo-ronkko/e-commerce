const layout = require('../layout');
const { getError } = require('../../helpers');

module.exports = ({ errors }) => {
    return layout({
        content: `
        <form method="POST" enctype="multipart/form-data">
            <input placeholder="Title" name="title" />
            <input placeholder="Price" name="price" />
            <input type="file" name="image" />
            <button>Submit</button>
        </form>
`
    });
};

// default method is "GET"
// enctype = encoding type
// default enctype="application/x-www-form-urlencoded"
// data is transmitted safely inside of url