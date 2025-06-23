import { Route, Routes } from "react-router-dom";


// Components
import Navbar from "./shared/components/Navbar";
// Pages
import Landingpage from "./shared/pages/mobile/LandingPage";
// Auth
import AuthLoginPage from "./features/auth/pages/AuthLoginPage";
import AuthSignUpPage from "./features/auth/pages/AuthSignUpPage";

const App = () => {
  
  // Render
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<AuthLoginPage />} />
        <Route path="/signup" element={<AuthSignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
