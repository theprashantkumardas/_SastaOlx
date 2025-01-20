import React from 'react'
import { Link } from 'react-router-dom';

const NavbarLinks = () => {
    return (
        <div>
            {/* Desktop Links */}
            <div className="hidden md:flex space-x-6 items-center">
                <Link to = "/" >Home</Link>
                <Link to = "/shop" >Collections</Link>
                {/* <Link to = "/profile" >Profile</Link> */}
                {/* <Link to = "/contact" >Contact</Link> */}
                <Link to = "/login" >Login</Link>
                
            </div>
        </div>
    )
}

export default NavbarLinks