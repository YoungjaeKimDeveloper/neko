/*

    Render different Layout depends on screen size

*/

import AuthDesktopLoginPage from "./desktop/AuthDesktopLoginPage";
import AuthMobileLoginPage from "./mobile/AuthMobileLoginPage";

const AuthLoginPage = () => {
  // Build Ui
  return (
    <>
      <AuthMobileLoginPage />
      <AuthDesktopLoginPage />
    </>
  );
};

export default AuthLoginPage;
