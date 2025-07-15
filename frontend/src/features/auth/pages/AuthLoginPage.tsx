/*

    Render different Layout depends on screen size

*/

import AuthDesktopLoginPage from "./desktop/AuthDesktopLoginPage";
import AuthMobileLoginPage from "./mobile/AuthMobileLoginPage";

const AuthLoginPage = () => {
  // Build Ui
  return (
    <>
      {/* Mobile */}
      <AuthMobileLoginPage />
      {/* Desktop */}
      <AuthDesktopLoginPage />
    </>
  );
};

export default AuthLoginPage;
