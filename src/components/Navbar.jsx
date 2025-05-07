import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';
import { toastErrorNotify } from '../helpers/ToastNotify';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      toastErrorNotify("Please login to search movies.");
      return;
    }

    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* شعار الموقع */}
          <Link to="/" className="text-xl font-bold text-gray-900 dark:text-white font-poppins">
            MovieFlix
          </Link>

          {/* ✅ شريط البحث دائماً ظاهر */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-grow max-w-lg items-center bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent w-full text-sm text-gray-700 dark:text-gray-200 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="ml-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {/* ✅ عناصر التحكم */}
          <div className="flex items-center gap-4 relative z-50">
            <ThemeToggle />

            <div className="relative">
              <button
                onClick={toggleMenu}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                <User size={24} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md p-2 z-50">
                  {currentUser ? (
                    <>
                      <div className="text-sm text-gray-700 dark:text-gray-300 px-2 py-1 truncate">
                        {currentUser.email}
                      </div>
                      <button
                        onClick={logout}
                        className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        onClick={() => setMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="block px-2 py-1 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        onClick={() => setMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
