import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdOutlineAddCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import logo from '../assets/logo.png';
import { logout } from "../slices/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gradient-to-r from-cyan-700 to-cyan-900 shadow-lg z-50">
      <div className="flex justify-between items-center px-6 py-4">

        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={logo} alt="logo" width={100} />
          </Link>
        </div>

        <div className="flex space-x-8">
          <Link to="/" className="text-white hover:text-blue-300 transition duration-300 flex items-center space-x-2">
            <IoLibrary className="text-2xl" />
            <span className="text-lg">Books</span>
          </Link>
          <Link to="/addBook" className="text-white hover:text-blue-300 transition duration-300 flex items-center space-x-2">
            <MdOutlineAddCircle className="text-2xl" />
            <span className="text-lg">AddBook</span>
          </Link>
          <Link to="/profile" className="text-white hover:text-blue-300 transition duration-300 flex items-center space-x-2">
            <FaUser className="text-2xl" />
            <span className="text-lg">Order</span>
          </Link>
          <Link to="/allBooks" className="text-white hover:text-blue-300 transition duration-300 flex items-center space-x-2">
            <FaClipboardList className="text-2xl" />
            <span className="text-lg">Details</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {user && (
            <>
              <span className="text-white text-lg font-semibold">{user.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-400 hover:text-red-600 transition duration-300"
              >
                <FaSignOutAlt className="text-xl" />
                <span>LogOut</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
