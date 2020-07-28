module.exports = ({ content }) => {// content is string
    return `
    <!DOCTYPE html>
        <html>
        <head>
        </head>
        <body>
            ${content}
        </body>
        </html>
    `;
};