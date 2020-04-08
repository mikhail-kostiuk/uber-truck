import React from 'react';
import {useSelector} from 'react-redux';
import './Header.scss';
import Logo from '../Logo/Logo';
import Nav from './Nav/Nav';
import Auth from './Auth/Auth';

function Header() {
  const {isAuthenticated} = useSelector((state) => state.auth);

  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__logo">
            <Logo />
          </div>
          {isAuthenticated && (
            <div className="header__nav">
              <Nav />
            </div>
          )}
          <div className="header__auth">
            <Auth />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
