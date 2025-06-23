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
      <div className="block lg:hidden">
        <AuthMobileLoginPage />
      </div>
      {/* Desktop */}
      <div className="hidden lg:block">
        <AuthDesktopLoginPage />
      </div>
    </>
  );
};

export default AuthLoginPage;
