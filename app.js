/*
    ---------------------------------------------------------------------------
    @Basic Skeleton for any JS/Express application
    @v0.1
    @Toby Versteeg
    @CodeGorilla
    @december 2020
*/

const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const ExpressError = require('express-error');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo")(session);
const path = require('path');
const router = express.Router();
const bodyParser = require("body-parser");
const assert = require('assert');

const app = express();
const methodOverride = require('method-override')


const events = require('./models/events');
const { captureRejectionSymbol } = require('events');
const Liedje = require('./models/events');


mongoose.connect('mongodb://localhost:27017/mijndatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("werkt?")
});



app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))

app.use(methodOverride('_method'))
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/popper', express.static(__dirname + '/node_modules/popper.js/dist/'));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

////////////////////////////////////////////////////

app.get('/liedjes', async (req, res) => {
    const liedjes = await Liedje.find({})
    // console.log(liedjes)
    res.render('layouts/liedjes', { liedjes })
});

app.get('/liedjes/:id', async (req, res) => {
    const { id } = req.params;
    const lied = await Liedje.findById(id)
    res.render('layouts/nummer', { lied })
});

app.get('/nieuw', (req, res) => {
    res.render('layouts/nieuw')
});


app.get('/', (req, res) => {
    res.render('layouts/index')
});

app.post('/liedjes', async (req, res) => {
    const nieuwLiedje = new Liedje(req.body);
    await nieuwLiedje.save();
    res.redirect(`/liedjes/${nieuwLiedje._id}`)

});

app.delete('/liedjes/:id', async (req, res) => {
    const { id } = req.params;
    const verwijderdLiedje = await Liedje.findByIdAndDelete(id);
    res.redirect('/liedjes');

});

app.listen(8080, () => {
    console.log('Hi! :-) I\'m listening to port 8080')
});