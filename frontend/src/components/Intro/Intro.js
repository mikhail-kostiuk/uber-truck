import React from 'react';
import './Intro.scss';

function Intro(props) {
  const {title, text} = props;
  return (
    <div className="intro">
      <h1 className="intro__title">{title}</h1>
      <p className="intro__text">{text}</p>
    </div>
  );
}

export default Intro;
