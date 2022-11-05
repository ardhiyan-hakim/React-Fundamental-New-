import React, { useContext } from "react";
import PropTypes from "prop-types";
import LocaleContext from "../../contexts/LocaleContext";

function NoteSignOutBtn({
  setIsLogin,
  setActiveNotes,
  setInactiveNotes,
  setQuery,
  setAccessToken,
}) {
  const { locale } = useContext(LocaleContext);

  return (
    <div className="sign_out">
      <button
        onClick={() => {
          setIsLogin(false);
          setQuery("");
          setActiveNotes([])
          setInactiveNotes([])
          setTimeout(() => {
            setAccessToken("");
          }, 500);
        }}
      >
        <span> {locale === "EN" ? "Sign Out" : "Keluar"}</span>
      </button>
    </div>
  );
}

NoteSignOutBtn.propTypes = {
  setIsLogin: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setAccessToken: PropTypes.func.isRequired,
};

export default NoteSignOutBtn;
