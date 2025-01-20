const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path')
const dotenv = require('dotenv');
dotenv.config();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage() // Use memory storage for multer
const upload = multer({ storage: storage }) // Configure multer

// const storage = multer.diskStorage({
//     filename:function(req, file,callback){
//         callback(null, file.originalname)
//     }
// })
// const upload = multer({ storage }) // Configure multer

exports.createProduct = async (req, res) => {
    const { name, description, price, category, subcategory } = req.body;
    const { userId, role } = req.user;

    try {
        console.log("Request File: ", req.file);
        if (role !== 'seller' && role !== 'both') {
            return res.status(403).json({ message: "Access denied. Only sellers can create products." });
        }
        const validCategories = [
            'electronics',
            'vehicles',
            'real-estate',
            'home-furniture',
            'fashion-beauty',
            'books-sports-hobbies',
            'jobs',
            'services',
            'pets-animals',
            'miscellaneous'
        ];

        if (!validCategories.includes(category)) { //This matches that is the provided category matched with the valid category , does the provided category included inside the validcategory
            return res.status(400).json({ message: "Invalid category selected" });
        }
        let imageUrl = "";
        console.log("Before uploading to cloudinary");
        if (req.file) { // check if file is present or not
            console.log("File exist");
            // Upload the image to Cloudinary
            try {
                // const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'), {
                //      folder: 'sasta-olx-products',
                //      resource_type: 'image',
                //  });
                const base64String = req.file.buffer.toString('base64'); // Get the base64 string
                const dataUrl = `data:${req.file.mimetype};base64,${base64String}` // Create the dataUrl
                  const result = await cloudinary.uploader.upload(dataUrl, {
                       folder: 'sasta-olx-products',
                       resource_type: 'image',
                   });
                 console.log("Result from cloudinary" , result);
                 imageUrl = result?.secure_url || '';  // Save the secure URL returned by cloudinary
                } catch(cloudinaryError) {
                   console.log("Cloudinary error" , cloudinaryError);
                   console.log("Error stack:", cloudinaryError.stack); // log stack trace
                     return res.status(500).json({ message: "Cloudinary Error", error: cloudinaryError.message })
               }
        }
        console.log("Before Product Creation")

        // Create the product object
        const product = new Product({
            name,
            description,
            price,
            imageUrl,
            sellerId: userId,
            category,
            subcategory
        });
        console.log("Product: ", product);

        console.log("Before PRoduct Save")

        await product.save();
        console.log("After Product save")
        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ message: "Server Error" });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);

    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.getCategories = async (req, res) => {
    try {
        const validCategories = [
            'electronics',
            'vehicles',
            'real-estate',
            'home-furniture',
            'fashion-beauty',
            'books-sports-hobbies',
            'jobs',
            'services',
            'pets-animals',
            'miscellaneous'
        ];
        res.status(200).json(validCategories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.getSubcategories = async (req, res) => {
    const { category } = req.query;
    try {
        let subcategories;
        switch (category) {
            case 'electronics':
                subcategories = ['Smartphones', 'Laptops', 'Tablets', 'Accessories',]
                break;
            case 'vehicles':
                subcategories = ['Cars', 'Motorcycles', 'Bicycles', 'Trucks']
                break;
            case 'real-estate':
                subcategories = ['Houses', 'Apartments', 'Land', 'Commercial']
                break;
            case 'home-furniture':
                subcategories = ['Sofas', 'Beds', 'Chairs', 'Tables']
                break;
            case 'fashion-beauty':
                subcategories = ['Clothing', 'Shoes', 'Jewelry', 'Cosmetics']
                break;
            case 'books-sports-hobbies':
                subcategories = ['Books', 'Sports Equipment', 'Collectibles', 'Musical Instruments']
                break;
            case 'jobs':
                subcategories = ['Full Time', 'Part Time', 'Freelance', 'Internships']
                break;
            case 'services':
                subcategories = ['Plumbing', 'Electrician', 'Cleaning', 'Repair']
                break;
            case 'pets-animals':
                subcategories = ['Dogs', 'Cats', 'Birds', 'Fish']
                break;
            case 'miscellaneous':
                subcategories = ['Others']
                break;
            default:
                subcategories = [];
        }
        res.status(200).json(subcategories);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
exports.upload = upload;