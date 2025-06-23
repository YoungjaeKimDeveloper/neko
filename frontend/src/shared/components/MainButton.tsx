/*

    Main Action Button 
     1.Login
     2. Logout
     3. View
     4. Post
     etc...

*/
import { Link } from "react-router-dom";
interface MainButton {
  text: string;
}
const MainButton = ({ text }: MainButton) => {
  // Build ui
  return (
    <div className="w-[100%] mx-auto text-sm">
      <div className="flex justify-center  px-20 py-2 rounded-xl shadow-sm hover:bg-gray-100 duration-200 cursor-pointer font-content w-full">
        <Link to={"/login"}>
          <button>{text}</button>
        </Link>
      </div>
    </div>
  );
};

export default MainButton;
