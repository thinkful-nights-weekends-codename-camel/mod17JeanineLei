import React from 'react';
import PropTypes from 'prop-types';

export default function NoteValidationError(props) {
  if(props.hasError) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}

NoteValidationError.propTypes = {
  hasError: PropTypes.string,
  message: PropTypes.string
}