import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-bold tracking-wide">
          🌍 Cultural Travel Guide
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            )}
          </svg>
        </button>

        {/* Nav links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:items-center md:space-x-6`}
        >
          <Link
            to="/home"
            className="block mt-3 md:mt-0 text-lg font-medium hover:text-gray-200 transition"
          >
            Home
          </Link>
          <Link
            to="/LandingPage"
            className="block mt-3 md:mt-0 text-lg font-medium hover:text-gray-200 transition"
          >
            Book
          </Link>
          <Link
            to="/about"
            className="block mt-3 md:mt-0 text-lg font-medium hover:text-gray-200 transition"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block mt-3 md:mt-0 text-lg font-medium hover:text-gray-200 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
