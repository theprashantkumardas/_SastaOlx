import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Register from '../src/components/Register';
import Login from '../src/components/Login';
import ProductList from './components/Products/ProductList';
import AddProduct from './components/Products/AddProduct';
import Profile from './pages/Profile';
import ChatPage from './pages/ChatPage';
import ProductDetail from "./pages/ProductDetailPage"; 
// import ChatWindow from './components/Chat/ChatWindow';
import CartPage from "./pages/CartPage.jsx";
import Home from './pages/Home.jsx';


// Main App Component
const App = () => {
    return(
        <Router>
            <Navbar/>
            <Routes>
                {/* These routes are for frontend navigation in top search bar */}
                <Route path="/" element = {<Home/>}/>
                <Route path="/register" element = {<Register/>} />
                <Route path="/login" element = {<Login/>} />
                <Route path="/add-product" element={<AddProduct/>} />
                <Route path="/shop" element={<ProductList/>} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/chat" element={<ChatPage />} /> 
                <Route path="/product/:id" element={<ProductDetail />} /> {/* Define the product detail route */} 
                <Route path="/cart"element ={<CartPage/>} />        
            </Routes>
        </Router>
    );

};

export default App;
