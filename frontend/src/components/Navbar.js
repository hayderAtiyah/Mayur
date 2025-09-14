import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold text-indigo-400">MyApp</div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/highest"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Highest Review
            </Link>
            <Link
              to="/lowest"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              Lowest Review
            </Link>
            <Link to="/clean">Clean Messages</Link>
            <Link to="/all-messages" className="hover:text-indigo-400 transition-colors duration-200">All Messages</Link>
            <Link
              to="/about"
              className="hover:text-indigo-400 transition-colors duration-200"
            >
              About
            </Link>
            
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
