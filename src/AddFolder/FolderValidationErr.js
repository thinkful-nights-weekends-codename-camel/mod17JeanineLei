import React from 'react';
import PropTypes from 'prop-types';

export default function FolderValidationErr(props) {
  if(props.hasError) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}

FolderValidationErr.propTypes = {
  hasError: PropTypes.string,
  message: PropTypes.string
}