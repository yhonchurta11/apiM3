'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const housechema = Schema({
    title: String,
    price: {type: Number, default:0},
    address: String,
    rooms: Number,
    area: String,
    photo: String,
    type: {type: String, enum: ['house', 'apartment', 'rooms', 'hostal' ]}
    
})

module.exports = mongoose.model('house', housechema)