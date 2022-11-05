import React, { useContext, useEffect, useState } from "react";
import { GrNext, GrPrevious } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../contexts/LocaleContext";
import { login, register } from "../scripts/utils/api";

import PropTypes from "prop-types";
import useInput from "../scripts/utils/CustomHooks";
import { getRoute } from "../generator/route";

function LandingPage({ isLogin, setIsLogin, accessToken, setAccessToken }) {
  const [registerUsername, setRegisterUsername, resetRegisterUsername] =
    useInput("");
  const [registerEmail, setRegisterEmail, resetRegisterEmail] = useInput("");
  const [registerPass, setRegisterPass, resetRegisterPass] = useInput("");

  const [signInEmail, setSignInEmail, resetSignInEmail] = useInput("");
  const [signInPass, setSignInPass, resetSignInPass] = useInput("");

  const [isSignIn, setIsSignIn] = useState(accessToken ? true : false);
  const [isSuccessRegistered, setIsSuccessRegistered] = useState(false);

  const { locale } = useContext(LocaleContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin === true) {
      navigate(getRoute(""));
    }
  }, [navigate, isLogin]);

  return (
    <main>
      <div className="login">
        <div className="register">
          <form
            className={isSignIn ? "inactive" : "active"}
            onSubmit={(event) => {
              event.preventDefault();

              if (registerPass.length < 6) {
                alert(
                  locale === "EN"
                    ? "Password Must Be At Least 6 Characters"
                    : "Password harus setidaknya 6 karakter"
                );
                return false;
              }

              const body = {
                name: registerUsername,
                email: registerEmail,
                password: registerPass,
              };

              register(body)
                .then((res) => {
                  const { error } = res;

                  if (error === false) {
                    resetRegisterUsername("");
                    resetRegisterEmail("");
                    resetRegisterPass("");
                    setIsSignIn(true);

                    setIsSuccessRegistered(true);
                    setTimeout(() => {
                      setIsSuccessRegistered(false);
                    }, 2000);
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            <h2> {locale === "EN" ? "Register" : "Daftar Akun"}</h2>

            <div className="register-input">
              <label htmlFor="register-username">
                {" "}
                {locale === "EN" ? "Username" : "Nama Pengguna"}
              </label>
              <input
                type="text"
                name="register-username"
                id="register-username"
                placeholder={locale === "EN" ? "Username" : "Nama Pengguna"}
                autoFocus
                value={registerUsername}
                onChange={setRegisterUsername}
              />
            </div>

            <div className="register-input">
              <label htmlFor="register-email">Email</label>
              <input
                type="email"
                name="register-email"
                id="register-email"
                placeholder="Email"
                value={registerEmail}
                onChange={setRegisterEmail}
              ></input>
            </div>

            <div className="register-input">
              <label htmlFor="register-password">
                {" "}
                {locale === "EN" ? "Password" : "Kata Sandi"}
              </label>
              <input
                type="password"
                name="register-password"
                id="register-password"
                placeholder="Password"
                value={registerPass}
                onChange={setRegisterPass}
              ></input>
            </div>

            <button type="submit" className="login-btn">
              SUBMIT
            </button>
          </form>
        </div>

        <div className="sign_in">
          <form
            className={isSignIn ? "active " : "inactive"}
            onSubmit={(event) => {
              event.preventDefault();

              const body = {
                email: signInEmail,
                password: signInPass,
              };

              login(body)
                .then((res) => {
                  const { error, data } = res;

                  if (error === false) {
                    setIsLogin(true);
                    setAccessToken(data.accessToken);
                    resetSignInEmail("");
                    resetSignInPass("");
                  }
                })
                .catch((err) => console.log(err));
            }}
          >
            <h2>{locale === "EN" ? "Sign In" : "Masuk Akun"}</h2>

            <div className="sign_in-input">
              <label htmlFor="sign_in-email">Email</label>
              <input
                type="email"
                name="sign_in-email"
                id="sign_in-email"
                placeholder="Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e)}
              ></input>
            </div>

            <div className="sign_in-input">
              <label htmlFor="sign_in-password">
                {" "}
                {locale === "EN" ? "Password" : "Kata Sandi"}
              </label>
              <input
                type="password"
                name="sign_in-password"
                id="sign_in-password"
                placeholder={locale === "EN" ? "Password" : "Kata Sandi"}
                value={signInPass}
                onChange={(e) => setSignInPass(e)}
              ></input>
            </div>

            <button type="submit" className="login-btn">
              SUBMIT
            </button>
          </form>
        </div>

        <button
          className="switch-btn"
          onClick={(event) => {
            event.preventDefault();
            onClickIsSignInEventHandler(event, isSignIn, setIsSignIn);
          }}
        >
          {isSignIn ? (
            <span>
              <GrPrevious /> {locale === "EN" ? "Register" : "Daftar"}
            </span>
          ) : (
            <span>
              {locale === "EN" ? "Sign In" : "Masuk"}
              <GrNext />
            </span>
          )}
        </button>

        <div
          className={`modals ${isSuccessRegistered ? "active" : "inactive"}`}
        >
          {locale === "EN"
            ? "Successfull Registration"
            : "Pendaftaran Akun Berhasil"}
        </div>
      </div>
    </main>
  );
}

const onClickIsSignInEventHandler = (event, isSignIn, setIsSignIn) => {
  setIsSignIn(!isSignIn);
};

LandingPage.propTypes = {
  isLogin: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
  accessToken: PropTypes.string.isRequired,
  setAccessToken: PropTypes.func.isRequired,
};

onClickIsSignInEventHandler.propTypes = {
  event: PropTypes.object,
  isSignIn: PropTypes.bool.isRequired,
  setIsLogin: PropTypes.func.isRequired,
};

export default LandingPage;
