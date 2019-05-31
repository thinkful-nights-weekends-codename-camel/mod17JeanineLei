import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'
import FolderValidationErr from './FolderValidationErr'

export default class AddFolder extends Component {
  state = {
    foldername: '',
    foldernameValid: false,
    formValid: false,
    validationmsgs: {
      foldername: ''
    }
  }

  static defaultProps = {
    history: {
      push: () => { }
    },
  }
  static contextType = ApiContext;

  updateFolder(foldername) {
    this.setState({ foldername },
      () => { this.validateFolderName(foldername) }
      //validate folderfunction goes here)
    )
  }
  handleSubmit (e) {
    e.preventDefault()
    // const { foldername } = this.setState;
    const foldername=this.state.foldername;
    console.log('foldername: ', foldername);
    const folder = {
      name: e.target['folder-name'].value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }
  validateFolderName(inputVal) {
    const fieldErrors = { ...this.state.validationmsgs };
    let hasError = false;

    inputVal = inputVal.trim(); //removes spaces I guess
    if (inputVal.length === 0) {
      fieldErrors.foldername = 'Please enter a Folder name.';
      hasError = true;
    } else {
      if (inputVal.length < 3) {
        fieldErrors.foldername = 'Folder name must be at least 3 characters long';
        hasError = true;
      } else {
        fieldErrors.foldername = '';
        hasError = false;
      }

      this.setState({
        validationmsgs: fieldErrors,
        foldernameValid: !hasError
      },
        this.formValid);
    }
  }
  formValid() {
    this.setState({
      formValid: this.state.foldernameValid
    })
  }

  render() {
    return (
      <section className='AddFolder'>
        <h2>Create a folder</h2>
        <NotefulForm onSubmit={e => this.handleSubmit(e)}>
          <div className='field'>
            <label htmlFor='folder-name-input'>
              Name
            </label>
            <input type='text' id='folder-name-input' name='folder-name' onChange={e => this.updateFolder(e.target.value)} />
            <FolderValidationErr
              hasError={!this.state.foldernameValid}
              message={this.state.validationmsgs.foldername}
            />
          </div>
          <div className='buttons'>
            <button type='submit' disabled={!this.state.formValid}>
              Add folder
            </button>
          </div>
        </NotefulForm>
      </section>
    )
  }
}
