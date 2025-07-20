import { Link } from "react-router-dom";
// Interface
interface AuthFooter {
  text: string;
  path: string;
  description: string;
}
const AuthFooter = ({ text, description, path }: AuthFooter) => {
  // BUILD UI
  return (
    <div className="mt-4 flex items-center gap-x-2 text-sm ">
      <p className="text-hintText">{description}</p>
      <Link to={`/${path}`}>
        <p className="underline">{text}</p>
      </Link>
    </div>
  );
};

export default AuthFooter;
