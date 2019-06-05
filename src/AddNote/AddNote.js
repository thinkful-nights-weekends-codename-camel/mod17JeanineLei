import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import NoteValidationError from './NoteValidationError';
import AddNoteErrorBoundary from '../App/AddNoteErrorBoundary';

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

  updateNoteContent(noteContent) {
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

    const newNote = {
      name: this.state.noteName,
      content: this.state.noteContent,
      folderId: this.state.noteFolderId,
      modified: new Date()
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

    // let newDate = new Date().getDateWRONG(); // for Error Boundary Testing

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
    } 
    this.setState({
      validationMsgs: fieldErrors,
      noteContentValid: !hasError
    }, this.formValid);
  }

  validateNoteFolderId(inputVal) {
    const fieldErrors = {...this.state.validationMsgs};
    let hasError = false;

    if(inputVal=== "...") {
      fieldErrors.noteFolderId = 'Please select a folder';
      hasError = true;
    } 

    this.setState({
      validationMsgs: fieldErrors,
      noteFolderIdValid: !hasError
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
        <AddNoteErrorBoundary>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='note-name-input'>
              Name
            </label>
            <input 
              value={this.state.noteName}
              type='text' 
              id='note-name-input' 
              name='note-name'
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
            <textarea 
              value={this.state.noteContent}
              id='note-content-input' 
              name='note-content' 
              onChange={e => this.updateNoteContent(e.target.value)}/>
            <NoteValidationError
              hasError={!this.state.noteContent}
              message={this.state.validationMsgs.noteContent}
              />
          </div>
          <div className='field'>
            <label htmlFor='note-folder-select'>
              Folder
            </label>
            <select 
              value={this.state.noteFolderId}
              id='note-folder-select' 
              name='note-folder-id' 
              onChange={e => this.updateNoteFolderId(e.target.value)}>
              <option value={null} >...</option>
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
        </AddNoteErrorBoundary>
      </section>
    )
  }
}
