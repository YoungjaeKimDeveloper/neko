/*

    Render different Layout depends on screen size

*/

import AuthDesktopSignUpPage from "./desktop/AuthDesktopSignUpPage";
import AuthMobileSignUpPage from "./mobile/AuthMobileSignUpPage";

const AuthSignUpPage = () => {
  return (
    <>
      <AuthMobileSignUpPage />
      <AuthDesktopSignUpPage />
    </>
  );
};

export default AuthSignUpPage;
