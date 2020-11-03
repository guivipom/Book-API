const mongoose = require('mongoose')
const User = require('./user')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        default: 0,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Price must be a postive number')
            }
        }
    },
    cover: {
        type: Buffer
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Book = mongoose.model('Book', bookSchema )

module.exports = Book