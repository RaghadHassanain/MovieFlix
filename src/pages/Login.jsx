import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helpers/ToastNotify";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toastSuccessNotify("Logged in successfully!");
      navigate("/");
    } catch (err) {
      toastErrorNotify("Login failed!");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      toastSuccessNotify("Logged in with Google!");
      navigate("/");
    } catch (err) {
      toastErrorNotify("Google login failed!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 pt-10">
      <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 p-10 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-center text-red-600 dark:text-red-400">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 dark:bg-gray-700 dark:border-gray-500 dark:text-white placeholder-gray-400"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block mb-1 font-medium text-gray-800 dark:text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring focus:ring-red-300 dark:bg-gray-700 dark:border-gray-500 dark:text-white placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
          >
            Login
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 dark:border-gray-500 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            <FcGoogle size={22} /> Sign in with Google
          </button>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link to="/register" className="text-red-600 hover:underline dark:text-red-400">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
