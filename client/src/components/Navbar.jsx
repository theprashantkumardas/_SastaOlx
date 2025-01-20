import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavbarLinks from './Navbar/NavbarLinks';
import NavbarIcons from './Navbar/NavbarIcons';
import NavbarLogo from './Navbar/NavbarLogo';
import NAvbarHamerg from './Navbar/NAvbarHamerg';
import SearchBar from './Navbar/NavSearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <section className='bg-customColor text-white shadow-md'>
      <nav className="container max-w-7xl mx-auto bg ">
        <div className=" mx-auto px-4 py-5 flex justify-between items-center">
          {/* Logo */}

          {/* Mobile Menu Button */}
          <div className='flex items-center space-x-4'>
            <button onClick={toggleMenu} className=' md:hidden'>
              <NAvbarHamerg onClick={toggleMenu} />
            </button>
            <NavbarLogo />
          </div>

          <NavbarLinks />

          <SearchBar />
          <NavbarIcons />


        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
                onClick={toggleMenu}
              >
                Collections
              </Link>
              {/* <Link
              to="/profile"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
              onClick={toggleMenu}
            >
              Profile
            </Link> */}
              {/* <Link
              to="/contact"
              className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
              onClick={toggleMenu}
            >
              Contact Us
            </Link> */}
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-medium transition duration-200"
                onClick={toggleMenu}
              >
                Login
              </Link>


            </div>
          </div>
        )}
      </nav>
    </section>

  );
};

export default Navbar;
