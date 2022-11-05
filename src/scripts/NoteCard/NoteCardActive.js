import React from "react";
import PropTypes from "prop-types";
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { archiveNote, deleteNote } from "../utils/api";
import { getRoute } from "../../generator/route";

function NoteCardActive({
  note,
  notes,
  setNotes,
  onDelete,
  onArchive,
  showFormattedDate,
}) {
  const navigate = useNavigate();
  const formattedDate = showFormattedDate(note.createdAt);

  return (
    <div className="note-card active">
      <div className="card-content">
        <div className="card-content__header">
          <h3>{note.title}</h3>
          <div
            className="detail-button"
            onClick={() => {
              const path = `detail/${note.id}`;
              navigate(getRoute(path));
            }}
          >
            <GrFormNext />
          </div>
        </div>
        <p>
          {formattedDate} <br />
          <br />
          {note.body}
        </p>
      </div>

      <div className="button-container active">
        <button
          className="archived"
          onClick={() => {
            archiveNote(note.id)
              .then(() => {
                onArchive(note.id, notes, setNotes);
              })
              .catch((err) => {
                alert(err.message);
              });
          }}
        >
          Archive
        </button>
        <button
          className="delete"
          onClick={() => {
            deleteNote(note.id)
              .then(() => {
                onDelete(note.id, notes, setNotes);
              })
              .catch((err) => {
                alert(err.message);
              });
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

NoteCardActive.propTypes = {
  note: PropTypes.object.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default NoteCardActive;
