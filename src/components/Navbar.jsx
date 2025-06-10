import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar bg-neutral bg-neutral-900 text-neutral-content shadow-lg">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="text-2xl font-extrabold tracking-wide">
          Travellers
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle navigation"
        >
          <svg
            className="w-7 h-7"
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
          } md:flex md:items-center md:space-x-8 text-base font-medium`}
        >
          <Link
            to="/countries"
            className="block py-2 md:py-0 hover:text-primary transition"
          >
            Countries
          </Link>
          <Link
            to="/"
            className="block py-2 md:py-0 hover:text-primary transition"
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="block py-2 md:py-0 hover:text-primary transition"
          >
            Tours
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
