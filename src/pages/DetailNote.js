import React from "react";
import PropTypes from "prop-types";
import NotFound from "./NotFound";
import { useNavigate, useParams } from "react-router-dom";
import { GrFormPrevious } from "react-icons/gr";

function findNote(notes, id) {
  return notes.filter((note) => note.id === id);
}

function DetailNote({ notes, showFormattedDate }) {
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;

  const [note] = findNote(notes, id);

  if (note === undefined) {
    return <NotFound />;
  }

  const formattedDate = showFormattedDate(note.createdAt);

  return (
    <main>
      <div className="detail-container">
        <h1>
          <span className="note-title">{note.title}</span>
          <span className="prev-button" onClick={() => navigate(-1)}>
            <GrFormPrevious />
          </span>
        </h1>
        <p>
          {formattedDate} - {note.archived ? "Archived" : "Active"}{" "}
        </p>
        <p>{note.body}</p>
      </div>
    </main>
  );
}

DetailNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

findNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
};

export default DetailNote;
