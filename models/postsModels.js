const mongoose = require('mongoose');

const PostsModels = mongoose.model(
    "clients",
    {
        name : {
            type: String,
            required: true,
        },
        logo:
        {
            type: Object,
            require: true,
        },
        prestation : {
            type: String,
            required: true,

        },
        price : {
            type: Number,
            required: true,

        },
        facture : {
            type: String,
            required: true,

        },
        accompte : {
            type: Number,
            required: true,
        },
        reste : {
            type: Number,
            required: true,
        },
        secteur : {
            type: String,
            required: true,

        },
        date : {
            type: String,
            required: false,
        },
        contact : {
            type: String,
            required: true,

        },
        mail : {
            type: String,
            required: true,

        },
        phone : {
            type: String,
            required: true,

        },
        details : {
            type: String,
            required: true,
        },

    },
    "clients",
)



module.exports = { PostsModels };