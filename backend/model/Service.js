let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ServiceSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Service", ServiceSchema);