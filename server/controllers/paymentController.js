

const dotenv = require('dotenv');
dotenv.config();
const Razorpay = require('razorpay');

 const razorpay = new Razorpay({
     key_id: process.env.RAZORPAY_KEY_ID,
     key_secret: process.env.RAZORPAY_KEY_SECRET
 });

exports.createRazorpayOrder = async (req, res) => {
     try {
         const { amount } = req.body;

         const options = {
             amount: amount*100, // Amount in paise
             currency: "INR",
             receipt: "receipt#1",
             payment_capture: 1
         }
         razorpay.orders.create(options, (err, order) => {
             if (err) {
                 console.log(err);
                 return res.status(500).json({ message: "Failed to create order"})
             }
             res.status(200).json({ orderId: order.id});
         })
     } catch(error) {
         console.log("Error Creating order", error);
         res.status(500).json({message:"failed to create order"})
     }

 };