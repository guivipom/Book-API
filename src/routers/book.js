const express = require('express')
const Book = require('../models/book')
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')

const router = new express.Router()


router.post('/books', auth, async (req, res) => {
    const book = new Book({
        ...req.body,
        author: req.user._id
    })

    try {
        await book.save()
        //const user = User.findById(book.author)
        res.status(201).send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.get('/books', async (req, res) => {

    try {
        const books = await Book.find({})
        res.send(books)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/books/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const book = await Book.findOne({ _id })

        if (!book) {
            return res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/books/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'price' ]
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const book = await Book.findOne({ _id: req.params.id, author: req.user._id})

        if (!book) {
            return res.status(404).send()
        }

        updates.forEach((update) => book[update] = req.body[update])
        await book.save()
        res.send(book)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/books/:id', auth, async (req, res) => {
    try {
        const book = await Book.findOneAndDelete({ _id: req.params.id, author: req.user._id })

        if (!book) {
            res.status(404).send()
        }

        res.send(book)
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg| jpeg |png)$/)){
            return cb(new Error('Please upload an image'))
        }

        cb(undefined,true)
    }
})


router.post('/books/:id/cover', auth  , upload.single('cover') , async (req, res)=>{
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()

    const _id = req.params.id
    console.log(_id)
    const book = await Book.findById({ _id })
    console.log(book)
    book.cover = buffer
    await req.book.save()
    res.send()
}, (error, req, res, next)=>{
    res.status(400).send(error.message)
})

router.delete('/books/:id/cover', auth, async (req, res) => {
    const _id = req.params.id
    const book = await Book.findOne({ _id })

    req.book.cover = undefined
    await req.book.save()
    res.send()
})

router.get('/books/:id/cover', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id)

        if (!book || !book.cover) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')
        res.send(book.cover)
    } catch (e) {
        res.status(404).send()
    }
})







module.exports = router

