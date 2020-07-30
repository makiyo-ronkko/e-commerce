module.exports = ({ products }) => {
    const renderedProducts = products.map(product => {
        return `
        <li>${product.title} - ${product.price}</li>
`
    }).join('');// map returns string
    return `
        ${renderedProducts}
    `;
};  