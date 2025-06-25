import { Navigate, Route, Routes } from "react-router-dom";

import "./index.css";
// Components
import Navbar from "./shared/components/Navbar";
import { Toaster } from "react-hot-toast";
// Pages
import Landingpage from "./shared/pages/mobile/LandingPage";
// Pages - Auth
import AuthLoginPage from "./features/auth/pages/AuthLoginPage";
import AuthSignUpPage from "./features/auth/pages/AuthSignUpPage";
// Pages - Home
import HomePage from "./features/home/pages/HomePage";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./shared/api/axios";
import { Loader } from "lucide-react";
import AuthNavbar from "./shared/components/AuthNavbar";

const App = () => {
  // fetch current User
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const result = await axiosInstance.get("/auth/me");
        return result.data;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Failed to fetch current user", error.message);
          return null;
        }
      }
    },
  });
  // Loading Page
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Loader className="animate-spin size-4 lg:size-11" />
        <p>Loading....</p>
      </div>
    );
  }
  // Render
  return (
    <div>
      <Toaster />
      {currentUser ? <AuthNavbar /> : <Navbar />}
      <Routes>
        <Route
          path="/"
          element={!currentUser ? <Landingpage /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={currentUser ? <HomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!currentUser ? <AuthLoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!currentUser ? <AuthSignUpPage /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
};

export default App;
