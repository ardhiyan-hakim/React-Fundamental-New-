import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NoteFooter from "../NoteApp/NoteFooter";
import NoteHeader from "../NoteApp/NoteHeader";

import PropTypes from "prop-types";
import { getRoute } from "../../generator/route";

export function BasicLayout({
  isLogin,
  setIsLogin,
  setActiveNotes,
  setInactiveNotes,
  setQuery,
  setAccessToken,
}) {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLogin) {
      navigate(getRoute("login"));
    }
  }, [isLogin, accessToken, navigate]);

  return (
    <>
      <NoteHeader
        setIsLogin={setIsLogin}
        setActiveNotes={setActiveNotes}
        setInactiveNotes={setInactiveNotes}
        setQuery={setQuery}
        setAccessToken={setAccessToken}
      />
      <Outlet />
      <NoteFooter />
    </>
  );
}

export function CustomLayout() {
  return (
    <>
      <Outlet />
      <NoteFooter />
    </>
  );
}

BasicLayout.propTpes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  setAccessToken: PropTypes.func.isRequired,
};
