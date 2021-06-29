const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');


router.post('/register', async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User(
        {
            username: req.body.username,
            email: req.body.email,
            password : hashedPassword,
        }
        
    );
    const result = await user.save()
    const {password, ...data} = await result.toJSON()
    res.send(data)
})

router.post('/login', async (req, res) => {
    console.log(req.body.email)
    console.log(req.body.password)
    const user = await User.findOne({email : req.body.email})

    if(!user) {
        return res.status(404).send({
            message : 'Adresse mail existe pas'
        })
    }

    if (!await bcrypt.compare(req.body.password, user.password)){
        return res.status(400).send({
            message: "Le mot de passe est incorrecte"
        })
    }
    const token = jwt.sign({_id: user._id}, "secret")
    res.cookie('jwt', token, {
        httpOnly: true, 
        maxAge: 24 * 60 * 60 * 1000
    })

    res.send({
        token
    })
})


router.get('/user', async (req, res) => {
    try{
        const cookie = req.cookies['jwt']
        const claims = jwt.verify(cookie, "secret")
        const user = await User.findOne({_id: claims._id})
        const {password, ...data} = await user.toJSON()
        console.log(data)

        res.send(data)
    }catch(error) {
        return res.status(401).send({
            message: "Un problème est survenue"
        })
        // 
    }
})

router.post('/logout', (req, res) => {
    res.cookie('jwt', '', {maxAge: 0})

    res.send({
        message: "success"
    })
})

module.exports = router;