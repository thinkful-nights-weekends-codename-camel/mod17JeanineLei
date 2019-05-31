import React from 'react';

export default function FolderValidationErr(props) {
  if(props.hasError) {
    return (
      <div className="error">{props.message}</div>
    );
  }

  return <></>
}