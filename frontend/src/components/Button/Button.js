import React from 'react';

function Button() {
  return (
    <button className="link-button" onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
