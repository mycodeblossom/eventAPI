const mongoose = require('mongoose');

const EventSchema = mongoose.Schema(
    {
        title: { type: String, required: true },
        description: String,
        start: Date
    }
);

module.exports = mongoose.model('Events', EventSchema);