const express = require('express');
const path = require("node:path");
const fs = require('fs');
const mime = require('mime-types')
const {readFile} = require('fs/promises');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'static', 'index.html'));
});

app.get('/o_nas', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'o_nas.html'));
});

app.get('/oferta', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'oferta.html'));
});

app.get('/kontakt', (req, res) => {
    res.sendFile(path.join(__dirname, 'static', 'kontakt.html'));
});

app.post('/submited', (req, res) => {
    const { imie, nazwisko, email, message } = req.body
    console.log(`Imię: ${imie}`)
    console.log(`Nazwisko: ${nazwisko}`)
    console.log(`Email: ${email}`)
    console.log(`Treść: ${message}`)
    res.redirect(`/`)
});

app.get('*', (req, res) => {
    res.status(404).send('404 - Strona nie istnieje');
});

app.listen(3000, () => {
    console.log('Server started on http://127.0.0.1:3000');
});