import React, { useState } from "react";
import { Logo_Url } from "../utils/constents";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

export function Header() {
  const [btnName, setBtnName] = useState("Login");
  function changeButtonName() {
    setBtnName(btnName === "Login" ? "Logout" : "Login");
  }
  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-white shadow-lg">
      {/* Logo */}
      <div className="flex items-center">
        <img src={Logo_Url} alt="Logo" className="h-20 w-22" />
      </div>

      {/* Navigation Items */}
      <div className="flex items-center space-x-6">
        <ul className="flex items-center space-x-6 text-gray-700 font-medium">
          <li>
            <strong className="text-sm">
              Online: {onlineStatus ? "🟢" : "🔴"}
            </strong>
          </li>
          <li>
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
          </li>
          <li>
            <Link to="/aboutus" className="hover:text-blue-600 transition">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contactus" className="hover:text-blue-600 transition">
              Contact Us
            </Link>
          </li>
          <li>
            <Link
              to="/groceries"
              className="hover:text-blue-600 transition"
            >
              Groceries
            </Link>
          </li>
          <li>Cart</li>
          <li>
            <button
              type="button"
              onClick={changeButtonName}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 transition"
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
