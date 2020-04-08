import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import './Nav.scss';

function Nav(props) {
  const {user} = useSelector((state) => state.auth);

  const items = user.role === 'Driver' ? ['Trucks', 'Loads'] : ['Loads'];

  return (
    <nav className="nav">
      <ul className="nav__list">
        {items &&
          items.map((item) => (
            <li className="nav__item" key={item}>
              <Link className="nav__link" to={`/${item.toLowerCase()}`}>
                {item}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Nav;
