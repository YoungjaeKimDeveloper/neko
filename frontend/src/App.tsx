import { Route, Routes } from "react-router-dom";
import Landingpage from "./shared/pages/Landingpage";
import Navbar from "./shared/components/Navbar";
const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landingpage />} />
      </Routes>
    </div>
  );
};

export default App;
