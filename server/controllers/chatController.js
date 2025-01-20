const Chat = require('../models/Chat');
const Message = require('../models/Message');
const Product = require('../models/Product')

const initiateChat = async (req, res) => {
    try {
        console.log('Initiate Chat Request Received:', req.body);
        console.log('User from authMiddleware:', req.user);

        const { buyerId, productId } = req.body;
        // const sellerId = req.user.userId; // Assuming logged-in user is the seller.

        if (!buyerId || !productId) {
          return res.status(400).json({ error: 'BuyerId or Product Id was not present' });
        }

        const product = await Product.findById(productId);

        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }

        const sellerId = product.sellerId;

        console.log('Buyer:', buyerId);
        console.log('Product:', productId);
        console.log('Seller:', sellerId);

        console.log('Before FindOne');
        // Check if chat already exists
        let chat = await Chat.findOne({ buyer: buyerId, seller: sellerId, product: productId });

        console.log('Chat before create:', chat);

        if (!chat) {
          // Create a new chat if it doesn't exist
          chat = new Chat({
            buyer: buyerId,
            seller: sellerId,
            product: productId,
            users: [buyerId, sellerId] // add both users
          });
          console.log('Before chat save');
          await chat.save();
          console.log('Chat after Create: ', chat);
        }

        console.log('Before returning chat Id');
        res.status(200).json({ chatId: chat._id }); // Return the chatId
        console.log('Returning chat id', chat._id);
    } catch (error) {
        console.error('Initiate Chat Error: ', error);
        res.status(500).json({ error: 'Failed to initiate chat.' });
    }
};

const getSellerChats = async (req, res) => {
    try {
        const sellerId = req.user.userId;

        const chats = await Chat.find({ seller: sellerId })
        .populate('buyer', 'name')
        .populate('product', 'name')
        .populate({
          path: 'latestMessage',
            populate: {
              path: 'sender',
              select: 'name email',
            },
        })
          .populate("users", 'name email') // populate users here
          .sort({ updatedAt: -1 });

      res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats.' });
    }
};

//get route for all chats that the  logged in user is a part of either as a buyer or a seller.

const getUserChats = async (req, res) => {
    try {
        const userId = req.user.userId;
        const chats = await Chat.find({ users: userId })
            .populate('buyer', 'name')
            .populate('product', 'name')
           .populate({
             path: 'latestMessage',
             populate: {
                path: 'sender',
                select: 'name email'
             }
           })
            .sort({ updatedAt: -1 });

        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch chats.' });
    }
};

const getMessagesForChat = async (req, res) => {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            return res.status(400).json({ error: 'Chat ID is required.' });
        }

        const messages = await Message.find({ chatId: chatId}).populate('sender', 'name email').sort({createdAt: 1})

        res.status(200).json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
};


const sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;

         if (!chatId) {
              return res.status(400).json({ error: 'Chat ID is required.' });
          }


        // const sender = req.user._id;
        const sender = req.user.userId;


        const message = new Message({
            chatId,
            sender,
            content,
        });

        await message.save();

        const chat = await Chat.findByIdAndUpdate(
             chatId,
            {
                latestMessage: message._id,
            },
             { new: true }
        )


        res.status(201).json(message);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message.' });
    }
};

module.exports = { initiateChat, getSellerChats, getMessagesForChat, sendMessage ,getUserChats  };