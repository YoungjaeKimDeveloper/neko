import { Route, Routes } from "react-router-dom";
// Components
import Navbar from "./shared/components/Navbar";
// Pages
import Landingpage from "./shared/pages/mobile/LandingPage";

// Auth
// Auth - mobile
// import AuthLoginMobilePage from "./features/auth/pages/mobile/AuthMobileLoginPage"
import AuthMobileSignUpPage from "./features/auth/pages/mobile/AuthMobileSignUpPage";
// Auth - Desktop
import AuthDesktopLoginPage from "./features/auth/pages/desktop/AuthDesktopLoginPage";
import AuthDesktopSignUpPage from "./features/auth/pages/desktop/AuthDesktopSignUpPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<AuthDesktopLoginPage />} />
        <Route path="/signup" element={<AuthDesktopSignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
