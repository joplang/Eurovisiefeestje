const mongoose = require('mongoose');
const Liedje = require('./models/events')

mongoose.connect('mongodb://localhost:27017/mijndatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("woei!")
    })
    .catch(err => {
        console.log("Ne pas de woei!")
        console.log(err)
    })



const siyusiyusiyusiyukonopelechky = [{

    "land": "Romania",
    "jaar": 2013,
    "naam": "It's My Life"
}, {

    "land": "Moldova",
    "jaar": 2010,
    "naam": "Run Away"
}, {

    "land": "Latvia",
    "jaar": 2014,
    "naam": "Cake To Bake"
}, {

    "land": "Iceland",
    "jaar": 2019,
    "naam": "HATRED WILL PREVAIL"
}, {

    "land": "Ukraine",
    "jaar": 2007,
    "naam": "Dancing Lasha Tumbai"
}, {

    "land": "Norway",
    "jaar": 2019,
    "naam": "Spirit In The Sky"
}, {
    "land": "Iceland",
    "jaar": 2021,
    "naam": "10 Years"
},
]

Liedje.insertMany(siyusiyusiyusiyukonopelechky)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log("help")
    })

