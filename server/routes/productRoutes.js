// This file handles the routes related to product management.

const express = require('express');
const {createProduct, getAllProducts  ,  getCategories , getSubcategories,} = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware'); // Import checkRoleMiddleware
const { upload } = require('../controllers/productController')
const router = express.Router();

// Route to create a new product (only accessible to authenticated users with 'seller' or 'both' roles)
router.post('/add', authMiddleware, checkRole(['seller', 'both']), upload.single('image'), createProduct);

// Route to get all products (accessible to all authenticated users)
router.get('/get-products',  getAllProducts);

// Route to get all categories
router.get('/categories', authMiddleware, getCategories);

// Route to get all subcategories for the selected category
router.get('/subcategories', authMiddleware, getSubcategories);

module.exports = router; // Exports the router to use in server.js


