import React, { useEffect } from "react";
import PropTypes from "prop-types";
import NoteCtnActive from "../scripts/NoteMain/NoteCtnActive";
import { useSearchParams } from "react-router-dom";
import NoteSearchBar from "../scripts/NoteHeader/NoteSearchBar";
import { getActiveNotes, getArchivedNotes } from "../scripts/utils/api";

function NoteActive({
  accessToken,
  notes,
  setNotes,
  setActiveNotes,
  setInactiveNotes,
  query,
  setQuery,
  onQuery,
  onDelete,
  onArchive,
  showFormattedDate,
}) {
  const [searchParams, setSearchparams] = useSearchParams();

  useEffect(() => {
    if (query) {
      setSearchparams({ title: query });
    } else {
      setSearchparams();
    }
  }, [query, setSearchparams]);

  useEffect(() => {
    if (accessToken) {
      getActiveNotes()
        .then((res) => {
          const { data } = res;
          setActiveNotes(data);
        })
        .catch((err) => alert(err.message));

      getArchivedNotes()
        .then((res) => {
          const { data } = res;
          setInactiveNotes(data);
        })
        .catch((err) => alert(err.message));
    }
  }, [setActiveNotes, setInactiveNotes, accessToken]);

  return (
    <main>
      <NoteSearchBar query={query} setQuery={setQuery} onQuery={onQuery} />

      <div className="note-container">
        <NoteCtnActive
          accessToken={accessToken}
          notes={notes}
          setNotes={setNotes}
          query={query}
          onDelete={onDelete}
          onArchive={onArchive}
          showFormattedDate={showFormattedDate}
        />
      </div>
    </main>
  );
}

NoteActive.propTpes = {
  accessToken: PropTypes.string.isRequired,
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  setActiveNotes: PropTypes.func.isRequired,
  setInactiveNotes: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onQuery: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  showFormattedDate: PropTypes.func.isRequired,
};

export default NoteActive;
