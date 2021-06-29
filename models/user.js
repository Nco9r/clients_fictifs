const mongoose = require('mongoose');

const User = mongoose.model(
    "user",
    {
        username : {
            type: String,
            required: true,
        },

        email : {
            type: String,
            createIndexes: true,
            required: true,
        },
        password : {
            type: String,
            required: true,
        },
        

    },
    "user",
)

module.exports = { User };