import React, { useState } from "react";
import { IDropdown } from "./types";
import { Link } from "react-router-dom";
import IconArrow from "../IconArrow/IconArrow";
import useIsMobile from "../../hooks/useIsMobile";
import style from "./Dropdown.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";

const Dropdown: React.FC<IDropdown> = ({ user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = useIsMobile();
  const { logout } = useAuthContext();

  const onClickHandler = () => {
    setDropdownOpen((prev) => !prev);
  };

  return (
    <div
      className="relative"
      onMouseEnter={!isMobile ? () => onClickHandler() : undefined}
      onMouseLeave={!isMobile ? () => onClickHandler() : undefined}
      onClick={() => (isMobile ? onClickHandler() : undefined)}
    >
      <div className="flex flex-row justify-between items-center gap-3 bg-background px-2 text-primary rounded cursor-pointer">
        Hi {user.username}! <IconArrow isOpen={dropdownOpen} />
      </div>
      <div
        className={`absolute top-8 right-0 bg-primary flex flex-col w-full rounded p-2 ${
          dropdownOpen ? style.fadeIn : style.fadeOut
        }`}
      >
        <Link
          to={`/profile/${user.id}`}
          className="hover:bg-background hover:text-primary p-2 rounded"
        >
          Profile
        </Link>
        <Link
          to="/create-blog"
          className="hover:bg-background hover:text-primary p-2 rounded"
        >
          Create Blog
        </Link>
        <Link
          to="/"
          onClick={() => logout()}
          className="hover:bg-background hover:text-primary p-2 rounded"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Dropdown;
