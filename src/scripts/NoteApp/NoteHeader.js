import React, { useContext } from "react";
import NoteLogo from "../NoteHeader/NoteLogo";
import NoteSignOutBtn from "../NoteHeader/NoteSignOutButton";

import { AiFillHome } from "react-icons/ai";
import { FaArchive } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import LocaleContext from "../../contexts/LocaleContext";
import ThemeContext from "../../contexts/ThemeContext";

import PropTypes from "prop-types";
import { getRoute } from "../../generator/route";

function NoteHeader({
  setIsLogin,
  setActiveNotes,
  setInactiveNotes,
  setQuery,
  setAccessToken,
}) {
  const navigate = useNavigate();
  const { locale, toggleLocale } = useContext(LocaleContext);
  const { isLightTheme, toggleTheme } = useContext(ThemeContext);

  return (
    <header>
      <NoteLogo />
      <div className="header-middle">
        <ul>
          <li
            onClick={() => {
              navigate(getRoute(""));
            }}
          >
            <AiFillHome />
          </li>
          <li
            onClick={() => {
              navigate(getRoute("archives"));
            }}
          >
            <FaArchive />
          </li>
          <li
            onClick={() => {
              navigate(getRoute("add"));
            }}
          >
            <IoIosAddCircle />
          </li>

          <li onClick={toggleTheme}>
            {isLightTheme ? <BsSunFill /> : <BsMoonFill />}
          </li>

          <li onClick={toggleLocale}>{locale}</li>
        </ul>
      </div>
      <div className="header-right">
        <NoteSignOutBtn
          setIsLogin={setIsLogin}
          setActiveNotes={setActiveNotes}
          setInactiveNotes={setInactiveNotes}
          setQuery={setQuery}
          setAccessToken={setAccessToken}
        />
      </div>
    </header>
  );
}

NoteHeader.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setAccessToken: PropTypes.func.isRequired,
};

export default NoteHeader;
