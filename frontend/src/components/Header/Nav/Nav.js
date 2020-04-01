import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Nav.scss';

function Nav(props) {
  const {user} = props.auth;

  const items = user.role === 'Driver' ? ['trucks', 'loads'] : ['loads'];

  return (
    <nav className="nav">
      <ul className="nav__list">
        {items &&
          items.map((item) => (
            <li className="nav__item" key={item}>
              <Link to={`/${item}`}>
                {() => item.charAt(0).toUpperCase() + this.slice(1)}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Nav);
