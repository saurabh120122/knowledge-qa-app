import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            📚 Knowledge Q&A
          </Link>
          
          <div className="flex gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded transition ${
                isActive('/') ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Home
            </Link>
            <Link
              to="/upload"
              className={`px-4 py-2 rounded transition ${
                isActive('/upload') ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Upload
            </Link>
            <Link
              to="/chat"
              className={`px-4 py-2 rounded transition ${
                isActive('/chat') ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Chat
            </Link>
            <Link
              to="/status"
              className={`px-4 py-2 rounded transition ${
                isActive('/status') ? 'bg-blue-700' : 'hover:bg-blue-500'
              }`}
            >
              Status
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
