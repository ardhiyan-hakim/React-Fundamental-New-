import React from "react";
import { useNavigate } from "react-router-dom";
import { getRoute } from "../../generator/route";

function NoteLogo() {
  const navigate = useNavigate();

  return (
    <div
      className="logo"
      onClick={() => {
        navigate(getRoute(""));
      }}
    >
      <span className="material-symbols-outlined"> sticky_note_2 </span>
      Notes Me
    </div>
  );
}

export default NoteLogo;
