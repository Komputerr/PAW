let http = require('http');
const url = require('url');
const hostname = '127.0.0.1';
const port = 8000;
const fs = require('fs');
const mime = require('mime-types')
const {readFile} = require('fs/promises');
http.createServer(async function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;
    switch (parsedUrl.pathname) {
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
            "<html lang='pl'>" +
                "<body>" +
                    "<h1 style='background-color: aqua'>To jest HTML tego typu</h1>" +
                "</body>" +
            "</html>");
            break;
        case "/htmldoc":
            const file = await readFile("filmy.html", "utf8");
            res.end(file);

            break;
        case "/get_params":
            console.log(JSON.stringify(queryParams,null,2));
            fs.writeFile(`params_${Date.now()}.json`,JSON.stringify(queryParams,null,2),(err) =>
                {
                    if (err) {
                        console.error('Wystąpił błąd podczas zapisu:', err);
                        return;
                    }
                    console.log('Dane zostały pomyślnie zapisane do pliku.');
                }
            );
            const Object = {'ok':'ok'};
            res.end(JSON.stringify(Object));
            break;
        default:
            const file_name = parsedUrl.pathname.slice(1);
                if(mime.lookup(file_name))
                {

                    let data = await readFile(`./assets/${file_name}`);
                    res.writeHead(200, {'Content-Type': `${mime.contentType(file_name)}`});
                    res.end(data);
                }
                else{
                    res.writeHead(404, {'Content-Type': `text/json`});
                    res.end(JSON.stringify('File not found'));
                }
            break;

    }
    res.end();
}).listen(port, hostname,  () => {
    console.log(`Path 1 at http://${hostname}:${port}`);
});
