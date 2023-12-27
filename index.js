const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate')


const data = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const productData = JSON.parse(data);


const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    
    if (pathname === '/overview' || pathname === '/') {
        res.writeHead(200, { 'Content-type': 'text/html' })
        const cardsHtml = productData.map((product) => replaceTemplate(tempCard, product)).join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        
        res.end(output);

    } else if (pathname === '/product') {
        res.writeHead(200, { 'Content-type': 'text/html' })

        const product = productData[query.id];
        const output = replaceTemplate(tempProduct, product);

        res.end(output);
    } else if (pathname === '/api') {
        res.writeHead(200, { 'Content-type': 'application/json' })
        res.end(json);

    } else {
        res.writeHead(404, { 'Content-type': 'text/html' })
        res.end("<h1>Not found!</h1>");
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log("Server started on port 8000");
})



