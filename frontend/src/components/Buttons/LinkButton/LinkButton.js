import React from 'react';
import './LinkButton.scss';

function LinkButton(props) {
  return (
    <button className="link-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default LinkButton;
