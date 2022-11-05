import React, { useContext } from "react";
import PropTypes from "prop-types";
import NoteCardActive from "../NoteCard/NoteCardActive";
import LocaleContext from "../../contexts/LocaleContext";
import { useState } from "react";

import ReactLoading from "react-loading";

function filterActive(notes, query) {
  return notes.filter((note) => {
    return note.archived === false && note.title.toLowerCase().includes(query);
  });
}

function NoteCtnActive({
  accessToken,
  notes,
  setNotes,
  query,
  onDelete,
  onArchive,
  showFormattedDate,
}) {
  const filteredNotes = filterActive(notes, query);
  const { locale } = useContext(LocaleContext);
  const [isLoading, setIsLoading] = useState(accessToken ? true : false);

  return (
    <div className="note-container__active">
      <h2>{locale === "EN" ? "Active Note" : "CATATAN AKTIF"}</h2>
      {isLoading ? (
        <div className="spin-bar_container">
          <ReactLoading
            type="spin"
            color="var(--text)"
            height={"20%"}
            width={"20%"}
            className="spin-bar"
          />
          {setTimeout(() => {
            setIsLoading(false);
          }, 500)}
        </div>
      ) : (
        <div className="note-container__card">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => {
              return (
                <NoteCardActive
                  key={note.id}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  onDelete={onDelete}
                  onArchive={onArchive}
                  showFormattedDate={showFormattedDate}
                />
              );
            })
          ) : (
            <div className="empty">
              <p>Tidak Ada Data Active Yang Tersedia</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

NoteCtnActive.propTpes = {
  accessToken: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

filterActive.propTpes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
};

export default NoteCtnActive;
