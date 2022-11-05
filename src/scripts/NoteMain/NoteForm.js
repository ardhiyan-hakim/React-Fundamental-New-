import React, { useContext } from "react";
import PropTypes from "prop-types";
import { addNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import LocaleContext from "../../contexts/LocaleContext";
import { getRoute } from "../../generator/route";

function NoteFormWrapper({ notes, setNotes, onAddNote }) {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);

  return (
    <NoteForm
      notes={notes}
      setNotes={setNotes}
      onAddNote={onAddNote}
      navigate={navigate}
      locale={locale}
    />
  );
}

class NoteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      maxCharTitle: 50,
      maxCharBody: 200,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onContentChangeEventHandler =
      this.onContentChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        title: event.target.value.slice(0, this.state.maxCharTitle),
      };
    });
  }

  onContentChangeEventHandler(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        body: event.target.value.slice(0, this.state.maxCharBody),
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();

    if (this.state.title.length === 0 || this.state.body.length === 0) {
      alert("Title dan Body tidak boleh kosong !!");
      return false;
    }

    this.props.onAddNote(this.state, this.props.notes, this.props.setNotes);

    const body = {
      title: this.state.title,
      body: this.state.body,
    };

    addNote(body)
      .then(() => {
        this.props.navigate(getRoute(""));
      })
      .catch((err) => alert(err.message));
  }

  render() {
    return (
      <form
        onSubmit={(event) => {
          this.onSubmitEventHandler(event);
        }}
      >
        <h1>
          {this.props.locale === "EN"
            ? "Create Your Notes"
            : "Buat Catatan Anda"}
        </h1>
        <label htmlFor="notes-title">
          {" "}
          {this.props.locale === "EN" ? "Title" : "Judul"}
        </label>
        <input
          type="text"
          name="notes-title"
          id="notes-title"
          placeholder={
            this.props.locale === "EN" ? "Note's Title" : "Judul Catatanmu"
          }
          autoFocus
          value={this.state.title}
          onChange={this.onTitleChangeEventHandler}
        />
        <p>
          {this.props.locale === "EN"
            ? "Remaining Characters"
            : "Karakter tersisa"}
          : {this.state.maxCharTitle - this.state.title.length}
        </p>

        <label htmlFor="notes-content">
          {" "}
          {this.props.locale === "EN" ? "Content" : "Isi Catatan"}
        </label>
        <textarea
          name="notes-content"
          id="notes-content"
          cols="50"
          rows="4"
          placeholder={
            this.props.locale === "EN"
              ? "Type something ..."
              : "Ketikkan sesuatu ..."
          }
          value={this.state.body}
          onChange={this.onContentChangeEventHandler}
        ></textarea>
        <p>
          {this.props.locale === "EN"
            ? "Remaining Characters"
            : "Karakter tersisa"}
          : {this.state.maxCharBody - this.state.body.length}
        </p>

        <button type="submit">
          {" "}
          {this.props.locale === "EN" ? "Submit" : "Kirim"}
        </button>
      </form>
    );
  }
}

NoteFormWrapper.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
};

NoteForm.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setNotes: PropTypes.func.isRequired,
  onAddNote: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  locale: PropTypes.string.isRequired,
};

export default NoteFormWrapper;
