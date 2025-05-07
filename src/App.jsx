import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MovieDetails from './pages/MovieDetails';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/movie/:id" element={
                <ProtectedRoute>
                  <MovieDetails />
                </ProtectedRoute>
              } />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
          <ToastContainer 
            position="top-right" 
            autoClose={3000}
            theme="colored"
            className="dark:bg-gray-900"
          />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;