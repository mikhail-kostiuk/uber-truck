import React from 'react';
import {Link} from 'react-router-dom';
import './Logo.scss';

function Logo() {
  return (
    <div className="logo">
      <Link className="logo__link" to="/">
        Uber Truck
      </Link>
    </div>
  );
}

export default Logo;
