const express = require('express');
const { default: mongoose } = require('mongoose');
const Album = require('../models/albumSchema');
const User = require('../models/userSchema');
const Photo = require('../models/photoSchema');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
    const data = new Photo({
        _id: new mongoose.Types.ObjectId(),
        user: mongoose.Types.ObjectId(req.body.user),
        album: mongoose.Types.ObjectId(req.body.album),
        name: req.body.name,
        imageUrl: req.body.imageUrl
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})



//Get all Method
router.get('/', async (req, res) => {
    try {
        const data = await Photo.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/album/:albumId/photos', async (req, res) => {
    try {
        console.log("dasdas")
        console.log(req.params)
        const album = await Photo.find({'album' : req.params.albumId}).populate({ 
            path: 'album',
            populate: {
              path: 'user'
            } 
         });

        console.log(album)
        res.json(album)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/user/:userId/photos', async (req, res) => {
    try {
        console.log(req.params)
        const album = await Photo.find({'user' : req.params.userId}).populate({ 
            path: 'user'
         });

        console.log(album)
        res.json(album)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/:id', async (req, res) => {
    try {
        const data = await Photo.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//Update by ID Method
router.patch('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        let updatedData = req.body;
        const options = { new: true };
        const result = await Photo.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Photo.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;