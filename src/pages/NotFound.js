import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/images/not-found.svg";
import LocaleContext from "../contexts/LocaleContext";
import { getRoute } from "../generator/route";

function NotFound() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  return (
    <main>
      <div className="not-found">
        <img src={NotFoundImage} alt="Not Found" />
        <h1>
          {" "}
          {locale === "EN"
            ? "Buddy, it looks like you got lost..."
            : "Sepertinya kamu tersesat ya ~!"}
        </h1>
        <button
          onClick={() => {
            navigate(getRoute(""));
          }}
        >
          {locale === "EN"
            ? "Back to our Home"
            : "Kembali ke Rumah"}
        </button>
      </div>
    </main>
  );
}

export default NotFound;
