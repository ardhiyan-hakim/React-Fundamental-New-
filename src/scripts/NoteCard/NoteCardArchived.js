import React from "react";
import PropTypes from "prop-types";
import { GrFormNext } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { deleteNote, unarchiveNote } from "../utils/api";
import { getRoute } from "../../generator/route";

function NoteCardArchived({
  note,
  notes,
  setNotes,
  onDelete,
  onRestore,
  showFormattedDate,
}) {
  const navigate = useNavigate();
  const formattedDate = showFormattedDate(note.createdAt);

  return (
    <div className="note-card archived">
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
          {formattedDate} <br /> <br />
          {note.body}
        </p>
      </div>

      <div className="button-container archived">
        <button
          className="restore"
          onClick={() => {
            unarchiveNote(note.id)
              .then(() => {
                onRestore(note.id, notes, setNotes);
              })
              .catch((err) => {
                alert(err.message);
              });
          }}
        >
          Restore
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

NoteCardArchived.propTypes = {
  note: PropTypes.object.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default NoteCardArchived;
