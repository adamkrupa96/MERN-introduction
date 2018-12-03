const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;

const TodoTaskSchema = new Schema({
    updated: {
        type: Date,
        default: Date.now
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    done: Boolean
});

TodoTaskSchema
    .virtual('isDone')
    .get(() => {
        return this.done;
    });

module.exports = mongoose.model('TodoTask', TodoTaskSchema);