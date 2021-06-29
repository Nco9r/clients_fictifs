const express = require('express');
const app = express();
require('./models/dbConfig'); 
const bodyParser = require('body-parser')
const postsRoutesClients = require('./routes/postsControllerClients');
const postsRoutesProspects = require('./routes/postControllersProspects');
const routesUsers = require('./routes/usersController');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const port = process.env.PORT || 8080
const mongoose = require('mongoose')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.fieldname);
    }
});

const upload = multer({
    storage : storage,
    limits: {
       fieldSize: 1024*1024*3
    }

});

app.post('/single', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.json({ file : req.file })
})


app.use(cookieParser())
mongoose.set('useFindAndModify', false);
app.use ('/uploads/images', express.static ('images'));
app.use (bodyParser.urlencoded ({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
}));

app.use('/clients', postsRoutesClients);
app.use('/prospects', postsRoutesProspects);
app.use('/auth', routesUsers);

app.listen(port, () => console.log('SERVER STARTED'))