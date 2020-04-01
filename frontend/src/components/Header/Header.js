import React from 'react';
import './Header.scss';
import Logo from '../Logo/Logo';
import Nav from './Nav/Nav';
import Auth from './Auth/Auth';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__logo">
            <Logo />
          </div>
          <div className="header__nav">
            <Nav />
          </div>
          <div className="header__auth">
            <Auth />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
