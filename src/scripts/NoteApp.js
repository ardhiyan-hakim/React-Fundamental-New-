import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

import AddNote from "../pages/AddNote";
import NoteFooter from "./NoteApp/NoteFooter";
import NoteActive from "../pages/NoteActive";
import NoteArchive from "../pages/NoteArchive";

import { showFormattedDate } from "./utils/data";
import DetailNote from "../pages/DetailNote";
import NotFound from "../pages/NotFound";
import LandingPage from "../pages/LandingPage";
import { BasicLayout, CustomLayout } from "./Layouts";
import LocaleContext from "../contexts/LocaleContext";
import ThemeContext from "../contexts/ThemeContext";

import { getUserLogged } from "./utils/api";
import { ADD_PAGE_PATH, ARCHIVE_PAGE_PATH, DEFAULT_PATH, DETAIL_PAGE_PATH, LANDING_PAGE_PATH, NOT_FOUND_PATH } from "../constant";

function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [activeNotes, setActiveNotes] = useState([]);
  const [inactiveNotes, setInactiveNotes] = useState([]);

  const [query, setQuery] = useState("");

  const token = localStorage.getItem("accessToken");
  const [accessToken, setAccessToken] = useState(token ?? "");
  const [isLogin, setIsLogin] = useState(token ? true : false);

  const theme = JSON.parse(localStorage.getItem("theme"));
  const [isLightTheme, setIsLightTheme] = useState(theme ?? true);

  const themeContextValue = useMemo(() => {
    return {
      isLightTheme,
      toggleTheme: () => {
        setIsLightTheme(!isLightTheme);
      },
    };
  }, [isLightTheme]);

  const lang = localStorage.getItem("lang");
  const [locale, setLocale] = useState(lang ?? "EN");

  const localeContextValue = useMemo(() => {
    return {
      locale,
      toggleLocale: () => {
        setLocale((prevState) => (prevState === "EN" ? "ID" : "EN"));
        localStorage.setItem("lang", locale === "EN" ? "ID" : "EN");
      },
    };
  }, [locale]);

  useEffect(() => {
    localStorage.setItem("accessToken", accessToken);

    return () => {
      getUserLogged();
    };
  }, [accessToken]);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isLightTheme ? "light" : "dark"
    );

    localStorage.setItem("theme", isLightTheme);
  }, [isLightTheme]);

  useEffect(() => {
    setNotes([...activeNotes, ...inactiveNotes]);
  }, [activeNotes, inactiveNotes]);

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <LocaleContext.Provider value={localeContextValue}>
        <div className="container">
          <div className="wrapper">
            <Routes>
              <Route
                path={DEFAULT_PATH}
                element={
                  <BasicLayout
                    isLogin={isLogin}
                    setIsLogin={setIsLogin}
                    setActiveNotes={setActiveNotes}
                    setInactiveNotes={setInactiveNotes}
                    setQuery={setQuery}
                    setAccessToken={setAccessToken}
                  />
                }
              >
                <Route
                  index
                  element={
                    <NoteActive
                      accessToken={accessToken}
                      notes={notes}
                      setNotes={setNotes}
                      setActiveNotes={setActiveNotes}
                      setInactiveNotes={setInactiveNotes}
                      query={query}
                      setQuery={setQuery}
                      onQuery={onQuerySubmitEventHandler}
                      onDelete={onDeleteEventHandler}
                      onArchive={onArchiveEventHandler}
                      showFormattedDate={showFormattedDate}
                    />
                  }
                />

                <Route
                  path={ARCHIVE_PAGE_PATH}
                  element={
                    <NoteArchive
                      accessToken={accessToken}
                      notes={notes}
                      setNotes={setNotes}
                      setActiveNotes={setActiveNotes}
                      setInactiveNotes={setInactiveNotes}
                      query={query}
                      setQuery={setQuery}
                      onQuery={onQuerySubmitEventHandler}
                      onDelete={onDeleteEventHandler}
                      onRestore={onRestoreEventHandler}
                      showFormattedDate={showFormattedDate}
                    />
                  }
                />

                <Route
                  path={ADD_PAGE_PATH}
                  element={
                    <AddNote
                      notes={notes}
                      setNotes={setNotes}
                      onAddNote={onAddNoteEventHandler}
                    />
                  }
                />

                <Route
                  exact
                  path={DETAIL_PAGE_PATH}
                  element={
                    <DetailNote
                      notes={notes}
                      showFormattedDate={showFormattedDate}
                    />
                  }
                />
              </Route>

              <Route path={LANDING_PAGE_PATH} element={<CustomLayout />}>
                <Route
                  index
                  element={
                    <LandingPage
                      isLogin={isLogin}
                      setIsLogin={setIsLogin}
                      accessToken={accessToken}
                      setAccessToken={setAccessToken}
                    />
                  }
                />
              </Route>

              <Route
                exact
                path={NOT_FOUND_PATH}
                element={
                  <>
                    <NotFound />
                    <NoteFooter />
                  </>
                }
              />
            </Routes>
          </div>
        </div>
      </LocaleContext.Provider>
    </ThemeContext.Provider>
  );
}

function onAddNoteEventHandler({ title, body }, notes, setNotes) {
  const newNote = {
    id: +new Date(),
    title,
    body,
    archived: false,
    createdAt: new Date().toISOString(),
  };

  setNotes([...notes, newNote]);
}

function onQuerySubmitEventHandler(event, query, setQuery) {
  event.preventDefault();
  setQuery(query);
}

function onArchiveEventHandler(id, notes, setNotes) {
  const currNotes = notes.filter((note) => note.id !== id);
  const note = notes.filter((note) => note.id === id);
  note[0].archived = true;

  const newNotes = [...currNotes, ...note];
  setNotes(newNotes);
}

function onRestoreEventHandler(id, notes, setNotes) {
  const currNotes = notes.filter((note) => note.id !== id);
  const note = notes.filter((note) => note.id === id);
  note[0].archived = false;

  const newNotes = [...currNotes, ...note];
  setNotes(newNotes);
}

function onDeleteEventHandler(id, notes, setNotes) {
  const newNotes = notes.filter((note) => note.id !== id);
  setNotes(newNotes);
}

export default NoteApp;
