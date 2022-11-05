import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import NoteCardArchived from "../NoteCard/NoteCardArchived";
import LocaleContext from "../../contexts/LocaleContext";
import ReactLoading from "react-loading";

function filterArchived(notes, query) {
  return notes.filter((note) => {
    return note.archived === true && note.title.toLowerCase().includes(query);
  });
}

function NoteCtnArchived({
  accessToken,
  notes,
  setNotes,
  query,
  onDelete,
  onRestore,
  showFormattedDate,
}) {
  const filteredNotes = filterArchived(notes, query);
  const { locale } = useContext(LocaleContext);
  const [isLoading, setIsLoading] = useState(accessToken ? true : false);

  return (
    <div className="note-container__archived">
      <h2>{locale === "EN" ? "Archived Note" : "CATATAN TERARSIP"}</h2>
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
                <NoteCardArchived
                  key={note.id}
                  note={note}
                  notes={notes}
                  setNotes={setNotes}
                  onDelete={onDelete}
                  onRestore={onRestore}
                  showFormattedDate={showFormattedDate}
                />
              );
            })
          ) : (
            <div className="empty">
              <p>Tidak Ada Data Archived Yang Tersedia</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

NoteCtnArchived.propTpes = {
  accessToken: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

filterArchived.propTpes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  query: PropTypes.string.isRequired,
};

export default NoteCtnArchived;
