import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-semibold">🌍 Cultural Travel Guide</Link>
      </div>
    </nav>
  );
}

export default Navbar;
