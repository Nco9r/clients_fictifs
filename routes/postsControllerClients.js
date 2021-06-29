const express = require('express')
const router = express.Router()
const { PostsModels } = require('../models/postsModels')
const ObjectId = require('mongoose').Types.ObjectId
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/images')
  },
  filename: (req, file, cb) => {
    cb (null, new Date().toISOString() + file.originalname);
  }
})

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3
  }
})

router.get('/', (req, res) => {
  PostsModels.find((err, docs) => {
    if (!err) res.send(docs)
  })
})

router.get('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('Id inconnu' + req.params.id)

  PostsModels.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('update erreur' + err)
  })
})

router.post('/', upload.single('image'), async (req, res) => {
  console.log(req.file)
  try {
  const newRecord = new PostsModels({
    name: req.body.name,
    logo: req.file,
    prestation: req.body.prestation,
    price: req.body.price,
    facture: req.body.facture,
    date: req.body.date,
    secteur: req.body.secteur,
    contact: req.body.contact,
    accompte: req.body.accompte,
    reste: req.body.reste,
    mail: req.body.mail,
    phone: req.body.phone,
    details: req.body.details
  })
  let Record = await newRecord.save() 
      res.send({ data : Record});
    } catch (err) {
        res.status(500).json({error : err})
    }
})

router.patch('/:id', upload.single('image'), (req, res) => {
  console.log(req.File)
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('Id inconnu' + req.params.id)

  const updateRecord = req.body

  PostsModels.findByIdAndUpdate(
    req.params.id,
    { $set: updateRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs)
      else console.log('update erreur' + err)
    }
  )
})

router.delete('/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('Id inconnu' + req.params.id)

  PostsModels.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('update erreur' + err)
  })
})

module.exports = router
