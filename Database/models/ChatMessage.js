const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
    sender: { type: ObjectID, required: true },
    receiver: { type: ObjectID, required: true },
    content: { type: String, required: true },
    time: { type: TimeStamp, required: true },
});

const ChatMessage = mongoose.model('ChatMessage', ChatMessageSchema);
module.exports = ChatMessage;