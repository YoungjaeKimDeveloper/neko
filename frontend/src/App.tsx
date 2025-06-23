import { Route, Routes } from "react-router-dom";
// Components
import Navbar from "./shared/components/Navbar";
// Pages
import Landingpage from "./shared/pages/mobile/LandingPage";
import AuthLoginMobilePage from "./features/auth/pages/mobile/AuthMobileLoginPage";
import AuthSignUpMobilePage from "./features/auth/pages/mobile/AuthMobileSignUpPage";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/login" element={<AuthLoginMobilePage />} />
        <Route path="/signup" element={<AuthSignUpMobilePage />} />
      </Routes>
    </div>
  );
};

export default App;
