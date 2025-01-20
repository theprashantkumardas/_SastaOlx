import React, { useState } from "react";
import Footer from "./Fotter/Fotter";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Register component to register a new user
const Register = () => {
  const navigate = useNavigate(); // Initialize the hook
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer", // Default role as "buyer"
  });

  const [message, setMessage] = useState("");

  // Handle the form input
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract field name and value
    setFormData({ ...formData, [name]: value }); // Update state with new value
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/register",
        formData
      ); // Send data to the backend
      setMessage("User registered successfully"); // Success message
      localStorage.setItem('token', response.data.token); // Store the token in local storage
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store the user object in local storage

      navigate("/shop");// Redirect to Add Product page
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed"); // Error message
    }
  };

  return (
    <>
    <div className="flex  justify-center  bg-gray-50">
      <div className="w-full my-12 max-w-md mx-4  h-1/4  sm:mx-auto bg-white p-8 rounded-3xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-customColor mb-6">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium "
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium "
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium "
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium "
            >
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customColor"
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-customColor rounded-full hover:bg-black focus:outline-none focus:ring-2 "
            >
              Register
            </button>
          </div>
        </form>

        <p className="text-center text-sm ">
          Already have an account?{" "}
          <a href="/login" className="text-customColor font-semibold hover:underline">
            Log in
          </a>
        </p>
      </div>
      {message && <p className="text-center mt-4 text-green-600">{message}</p>}
    </div>
    <Footer/>
    </>
  );
};

export default Register;
