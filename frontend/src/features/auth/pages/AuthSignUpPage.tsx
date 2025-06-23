/*

    Render different Layout depends on screen size

*/

import AuthDesktopSignUpPage from "./desktop/AuthDesktopSignUpPage";
import AuthMobileSignUpPage from "./mobile/AuthMobileSignUpPage";

const AuthSignUpPage = () => {
  return (
    <>
      <div className="block lg:hidden">
        <AuthMobileSignUpPage />
      </div>
      <div className="hidden lg:block">
        <AuthDesktopSignUpPage />
      </div>
    </>
  );
};

export default AuthSignUpPage;
