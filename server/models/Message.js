const mongoose = require('mongoose');


const messageSchema = new mongoose.Schema({
    chatId: { 
        type: mongoose.Schema.ObjectId, 
        ref: 'Chat', 
        required: true 
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
   
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);