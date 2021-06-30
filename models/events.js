const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');

const eurovisie = new mongoose.Schema({
    land: String,
    jaar: Number,
    naam: String,
});

const Liedje = mongoose.model('Liedje', eurovisie);

module.exports = Liedje;
