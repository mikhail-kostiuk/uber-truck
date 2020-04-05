import React from 'react';
import './Button.scss';

function Button(props) {
  let className = 'button';
  if (props.danger) {
    className += ` ${className}--danger`;
  }
  return (
    <button className={className} type={props.type} onClick={props.onClick}>
      {props.text}
    </button>
  );
}

export default Button;
