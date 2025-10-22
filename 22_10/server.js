const express = require('express');
const path = require("node:path");
const fs = require('fs');
const mime = require('mime-types')
const app = express();

app.use(express.static(path.join(__dirname, '/assets')));

app.get('/str', (req, res) => {
    res.send('Strona glowna!');
});
app.get('/json', (req, res) => {
    res.send(
        JSON.stringify({
            hello: 'World!'
        })
    );
});
app.get('/html', (req, res) => {
    res.send("<!doctype html>" +
        "<html lang='pl'>" +
        "<body>" +
        "<h1 style='background-color: aqua'>To jest HTML tego typu</h1>" +
        "</body>" +
        "</html>");
});
app.get('/htmldoc', (req, res) => {
    res.sendFile(path.join(__dirname, '/test.html'));
});
app.get('/get_params', (req, res) => {
    let queryParams = req.query;
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
    res.send(JSON.stringify(Object));
});
app.get('*', async (req, res) => {
    res.status(404).send('404');
});
app.listen(3000, () =>
{
    console.log(`Server started on port http://127.0.0.1:3000`);
});