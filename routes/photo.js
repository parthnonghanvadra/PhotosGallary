const express = require('express');
const { default: mongoose } = require('mongoose');
const Album = require('../models/albumSchema');
const Photo = require('../models/photoSchema');
const router = express.Router();

//Post Method
router.post('/create', async (req, res) => {
  const data = new Photo({
    _id: new mongoose.Types.ObjectId(),
    user: mongoose.Types.ObjectId(req.body.user),
    album: mongoose.Types.ObjectId(req.body.album),
    name: req.body.name,
    imageUrl: req.body.imageUrl
  })

  try {
    const dataToSave = await data.save();
    await Album.findById(dataToSave.album).update({lastUpdatedDate: new Date()});
    res.status(200).json(dataToSave)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
})


//Get all Method
router.get('/', async (req, res) => {
  try {
    const data = await Photo.find();
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/album/:albumId/photos', async (req, res) => {
  try {
    const album = await Photo.find({'album': req.params.albumId}).populate({
      path: 'album',
      populate: {
        path: 'user'
      }
    });

    res.json(album)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/user/:userId/photos', async (req, res) => {
  try {
    const album = await Photo.find({'user': req.params.userId}).populate({
      path: 'user'
    });

    res.json(album)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})

//Get by ID Method
router.get('/:id', async (req, res) => {
  try {
    const data = await Photo.findById(req.params.id);
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


//Update by ID Method
router.patch('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    let updatedData = req.body;
    const options = {new: true};
    const result = await Photo.findByIdAndUpdate(
      id, updatedData, options
    )

    res.send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

//Delete by ID Method
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Photo.findByIdAndDelete(id);
    await Album.findById(data.album).update({ lastUpdatedDate: new Date() });
    res.send(`Document with ${data.name} has been deleted..`)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

module.exports = router;
