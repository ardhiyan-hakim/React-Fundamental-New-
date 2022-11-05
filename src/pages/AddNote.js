import React from "react";
import PropTypes from "prop-types";
import NoteForm from "../scripts/NoteMain/NoteForm";

function AddNote({ notes, setNotes, onAddNote }) {
  return (
    <main>
      <div className="note-form">
        <NoteForm
          notes={notes}
          setNotes={setNotes}
          onAddNote={onAddNote}
        />
      </div>
    </main>
  );
}

AddNote.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
};

export default AddNote;
