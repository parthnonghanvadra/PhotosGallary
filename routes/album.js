const express = require('express');
const { default: mongoose } = require('mongoose');
const Album = require('../models/albumSchema');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {
  const data = new Album({
    _id: new mongoose.Types.ObjectId(),
    user: mongoose.Types.ObjectId(req.body.user),
    name: req.body.name
  })

  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


//Get all Method
router.get('/', async (req, res) => {
  try {
    const data = await Album.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/user/:userId/album', async (req, res) => {
  try {
    console.log("dasdas")
    console.log(req.params)
    const album = await Album.find({'user': req.params.userId}).populate('user');

    console.log(album)
    res.json(album)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


//Get by ID Method
router.get('/:id', async (req, res) => {
  try {
    const data = await Album.findById(req.params.id);
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


//Update by ID Method
router.patch('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = req.body;
    const options = {new: true};
    const result = await Album.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Album.findByIdAndDelete(id)
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})

module.exports = router;
