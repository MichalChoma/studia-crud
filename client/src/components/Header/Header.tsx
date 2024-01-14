import useIsMobile from "../../hooks/useIsMobile";
import { useAuthContext } from "../../hooks/useAuthContext";
import style from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";

const Header = () => {
  const isMobile = useIsMobile();
  const { user } = useAuthContext();
  return (
    <nav
      className={`p-4 px-10 text-xl lg:px-24 bg-primary text-white flex justify-between items-center ${
        isMobile ? style.mobile : style.desktop
      }`}
    >
      <Link to="/" className="cursor-pointer text-2xl">
        BlogPost
      </Link>
      {user ? (
        <Dropdown user={user} />
      ) : (
        <Link to="/login" className="text">
          <Button>Login</Button>
        </Link>
      )}
    </nav>
  );
};

export default Header;
