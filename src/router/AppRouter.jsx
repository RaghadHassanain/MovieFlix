import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MovieDetail from "../pages/MovieDetail";

const AppRouter = () => {
  const { currentUser } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/login" element={!currentUser ? <Login /> : <Navigate to="/" />} />

        {/* تعديل هنا: عرض صفحة Register دائماً مؤقتًا */}
        <Route path="/register" element={<Register />} />

        <Route path="/movie/:id" element={<MovieDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
