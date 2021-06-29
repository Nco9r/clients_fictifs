const mongoose = require('mongoose')

const MONGODB_URI = 'mongodb+srv://nco9r:4kdukzw977VVC@cluster0.g6w1s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(

    MONGODB_URI,
    { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    },
    (err) => {
        if (!err) console.log('Mongoose connected');
        else console.log('Erreur de connexion' + err);
    }
) 