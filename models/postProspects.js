const mongoose = require('mongoose');

const PostsProspects = mongoose.model(
    "prospects",
    {
        name : {
            type: String,
            required: false,
        },
        logo : {
            type: String,
            required: false,
        },
        prestation : {
            type: String,
            required: false,
        },
        price : {
            type: Number,
            required: false,
        },
        facture : {
            type: String,
            required: false,
        },
        accompte : {
            type: Number,
            required: false,
        },
        reste : {
            type: Number,
            required: false,
        },
        secteur : {
            type: String,
            required: false,
        },
        date : {
            type: String,
            required: false,
        },
        contact : {
            type: String,
            required: false,
        },
        mail : {
            type: String,
            required: false,
        },
        phone : {
            type: String,
            required: false,
        },
        details : {
            type: String,
            required: false,
        },

    },
    "prospects",
)



module.exports = { PostsProspects };