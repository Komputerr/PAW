let http = require('http');
const hostname = '127.0.0.1';
const port = 8000;
const {readFile} = require('fs/promises');
http.createServer(async function (req, res) {
    switch (req.url) {
        case "/str":
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.write('Strona główna!');
            break;
        case "/json":
            res.writeHead(200, {'Content-Type': 'text/json; charset=utf-8'});
            res.write('{\n' +
                '  "name": "zad1.10",\n' +
                '  "version": "1.0.0",\n' +
                '  "description": "",\n' +
                '  "main": "index.js",\n' +
                '  "scripts": {\n' +
                '    "test": "echo \\"Error: no test specified\\" && exit 1"\n' +
                '  },\n' +
                '  "keywords": [],\n' +
                '  "author": "",\n' +
                '  "license": "ISC"\n' +
                '}\n');
            break;
        case "/html":
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write("<!doctype html>" +
            "<html>" +
                "<body>" +
                    "<h1 style='background-color: aqua'>To jest HTML tego typu</h1>" +
                "</body>" +
            "</html>");
            break;
        case "/htmldoc":

            const file = await readFile("filmy.html", "utf8");
            res.end(file);

            break;
    }
    res.end();
}).listen(port, hostname,  () => {
    console.log(`Path 1 at http://${hostname}:${port}`);
});
