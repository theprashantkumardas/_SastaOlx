import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();

  // State to hold product details, categories, and subcategories
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    subcategory: "",
  });
  const [categories, setCategories] = useState([]); // List of categories
  const [subcategories, setSubcategories] = useState([]); // List of subcategories for selected category
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null); // State to store the file.

  // Check for authentication and fetch categories on component load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:7000/api/product/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error.response?.data || error.message);
      }
    };

    fetchCategories();
  }, [navigate]);

  // Fetch subcategories when category changes
  const handleCategoryChange = async (e) => {
    const selectedCategory = e.target.value;
    setProduct({ ...product, category: selectedCategory, subcategory: "" });

    if (selectedCategory) {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/product/subcategories?category=${selectedCategory}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
        );
        setSubcategories(response.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error.response?.data || error.message);
        setSubcategories([]);
      }
    } else {
      setSubcategories([]);
    }
  };

  // Handle input changes for other fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Function for handling image selection
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);  // Store the file in state
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token"); // Retrieve token
      const formData = new FormData(); // Create a FormData object
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);
      formData.append("category", product.category);
      formData.append("subcategory", product.subcategory);
      if (image) { // Append image if selected.
        formData.append('image', image)
      }
      const response = await axios.post(
        "http://localhost:7000/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      setMessage("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <input
            type="number"
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Product Description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            rows="4"
          />
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            name="subcategory"
            value={product.subcategory}
            onChange={handleChange}
            required
            disabled={!product.category}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-full transition duration-200"
          // hover:bg-blue-600
          >
            Add Product
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center ${message.includes("successfully") ? "text-green-600" : "text-red-600"
              }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;