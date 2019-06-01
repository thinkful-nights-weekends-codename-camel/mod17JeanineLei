import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import NoteValidationError from './NoteValidationError';

export default class AddNote extends Component {
  state = {
    noteName: '',
    noteContent: '',
    noteFolderId: '',
    noteNameValid: false,
    noteContentValid: false,
    noteFolderIdValid: false,
    formValid: false,
    validationMsgs: {
      noteName: '',
      noteContent: '',
      noteFolderId: ''
    }
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  updateNoteName(noteName) {
    this.setState({noteName},
      () => {this.validateNoteName(noteName)}
    );
  }

  updateNotecontent(noteContent) {
    this.setState({noteContent},
      () => {this.validateNoteContent(noteContent)}
    );
  }

  updateNoteFolderId(noteFolderId) {
    this.setState({noteFolderId},
      () => {this.validateNoteFolderId(noteFolderId)}
    );
  }

  handleSubmit = e => {
    e.preventDefault()
    const noteName = this.state.noteName;
    console.log('noteName: ', noteName);
    const noteContent = this.state.noteContent;
    const noteFolderId = this.state.noteFolderId;

    const newNote = {
      name: e.target['note-name'].value,
      content: e.target['note-content'].value,
      folderId: e.target['note-folder-id'].value,
      modified: new Date(),
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  validateNoteName(inputVal) {
    const fieldErrors = {...this.state.validationMsgs};
    let hasError = false;

    inputVal = inputVal.trim();
    if (inputVal.length === 0) {
      fieldErrors.noteName = 'Please enter a Note name.';
      hasError = true;
    } else {
      if (inputVal.length < 3) {
        fieldErrors.noteName = 'Note name must be at least 3 characters long.';
        hasError = true;
      } else {
        fieldErrors.noteName = '';
        hasError = false;
      }
    }
    this.setState({
      validationMsgs: fieldErrors,
      noteNameValid: !hasError
    }, this.formValid);
  }

  validateNoteContent(inputVal) {
    const fieldErrors = {...this.state.validationMsgs};
    let hasError = false;

    inputVal = inputVal.trim();
    if (inputVal.length === 0) {
      fieldErrors.noteContent = 'Please type something for your note.';
      hasError = true;
    } else {
      if (inputVal.length < 3) {
        fieldErrors.noteContent = 'Note content should be more than 3 characters';
        hasError = true;
      } else {
        fieldErrors.noteContent = '';
        hasError = false;
      }
    }
    this.setState({
      validationMsgs: fieldErrors,
      noteContentValid: !hasError
    }, this.formValid);
  }

  validateNoteFolderId(inputVal) {
    const fieldErrors = {...this.state.validationMsgs};
    let hasError = false;

    if(inputVal=== "empty") {
      fieldErrors.noteFolderId = 'Please select a folder';
      hasError = true;
    } 

    this.setState({
      validationMsgs: fieldErrors,
      noteFolderId: !hasError
    }, this.formValid);
  }

  formValid() {
    this.setState({
      formValid: this.state.noteNameValid && this.state.noteContentValid && this.state.noteFolderId
    });
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='AddNote'>
        <h2>Create a note</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input type='text' id='note-name-input' name='note-name'
             onChange={e => this.updateNoteName(e.target.value)}/>
             <NoteValidationError
              hasError={!this.state.noteNameValid}
              message={this.state.validationMsgs.noteName}
              />
          </div>
          <div className='field'>
            <label htmlFor='note-content-input'>
              Content
            </label>
            <textarea id='note-content-input' name='note-content' 
              onChange={e => this.updateNotecontent(e.target.value)}/>
            <NoteValidationError
              hasError={!this.state.noteContent}
              message={this.state.validationMsgs.noteContent}
              />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select id='note-folder-select' name='note-folder-id'>
              <option value={null} onChange={e => this.updateNoteFolderId(e.target.value)}>...</option>
              {folders.map(folder =>
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              )}
            </select>
            <NoteValidationError
              hasError={!this.state.noteFolderId}
              message={this.state.validationMsgs.noteFolderId}
            />
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add note
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
