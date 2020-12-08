const mongoose = require('mongoose');

const CourseworkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectTitle: {
        type: String,
        required: true,
        trim: true
    },
    module: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    },
    milestones: {
        type: [String]
    },
    due: {
        type: Date,
        default: Date.now
    },
    completion: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Coursework', CourseworkSchema);