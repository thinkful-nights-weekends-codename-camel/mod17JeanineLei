// import React, { Component } from 'react'
// import NotefulForm from '../NotefulForm/NotefulForm'
// import './AddFolder.css'
// import FolderValidationErr from './FolderValidationErr';

// export default class AddFolder extends Component {
//   state = {
//     foldername: '',
//     foldernameValid: false,
//     formValid: false,
//     validationmsgs: {
//       foldername: ''
//     }
//   }

//   updateFolder(foldername) {
//     this.setState({ foldername },
//       () => { this.validateFolderName(foldername) }
//       //validate folderfunction goes here)
//     )
//   }
//   handleSubmit(e) {
//     e.preventDefault();
//     const { foldername } = this.setState;
//     console.log('foldername: ', foldername);
//   }

//   validateFolderName(inputVal) {
//     const fieldErrors = { ...this.state.validationmsgs };
//     let hasError = false;

//     inputVal = inputVal.trim(); //removes spaces I guess
//     if (inputVal.length === 0) {
//       fieldErrors.name = 'Please enter a Folder name.';
//       hasError = true;
//     } else {
//       if (inputVal.length < 3) {
//         fieldErrors.name = 'Folder name must be at least 3 characters long';
//         hasError = true;
//       } else {
//         fieldErrors.name = '';
//         hasError = false;
//       }

//       this.setState({
//         validationmsgs: fieldErrors,
//         foldernameValid: !hasError
//       },
//         this.formValid);
//     }
//   }
//   formValid() {
//     this.setState({
//       formValid: this.state.foldernameValid
//     })
//   }


//   render() {
//     return (
//       // <form className='AddFolder' 

//       <section className='AddFolder'>
//         <h2>Create a folder</h2>
//         <NotefulForm>
//           <div className='field'>
//             <label htmlFor='folder-name-input'>
//               Name
//             </label>
//             <input type='text' id='folder-name-input'
//               onChange={e => this.updateFolder(e.target.value)}
//             />
//             <FolderValidationErr
//               hasError={!this.state.foldernameValid}
//               message={this.state.validationmsgs.foldername}
//             />

//           </div>
//           <div className='buttons'>
//             <button type='submit' disabled={!this.state.formValid} onSubmit={e => this.handleSubmit(e)}
//             >
//               Add folder
//             </button>
//           </div>
//         </NotefulForm>
//       </section>
//       // </form>
//     )
//   }
// }
