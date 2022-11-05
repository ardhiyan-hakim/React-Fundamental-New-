import React from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";

function NoteSearchBarWrapper({ query, setQuery, onQuery }) {
  const [searchParams, setSearchparams] = useSearchParams();

  return (
    <NoteSearchBar
      query={query}
      setQuery={setQuery}
      onQuery={onQuery}
      setSearchparams={setSearchparams}
    />
  );
}

class NoteSearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: this.props.query || "",
    };
  }

  onQueryChangeEventHandler(event) {
    this.setState({ query: event.target.value });
  }

  render() {
    return (
      <div className="search-bar">
        <form
          id="search-notes"
          onSubmit={(event) => {
            this.props.onQuery(event, this.state.query, this.props.setQuery);
            this.props.setSearchparams({ title: this.state.query });
          }}
        >
          <div className="search-column">
            <input
              type="text"
              id="search-input"
              placeholder="Type your note"
              value={this.state.query}
              onChange={(e) => {
                this.onQueryChangeEventHandler(e);
              }}
            />
          </div>
          <div className="submit-column">
            <button type="submit">
              <span className="material-symbols-outlined"> search </span>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NoteSearchBarWrapper.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onQuery: PropTypes.func.isRequired,
};

NoteSearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  onQuery: PropTypes.func.isRequired,
  setSearchparams: PropTypes.func.isRequired,
};

export default NoteSearchBarWrapper;
