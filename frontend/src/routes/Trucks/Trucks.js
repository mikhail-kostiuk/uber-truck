import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Trucks.scss';
import Header from '../../components/Header/Header';
import Truck from '../../components/Cards/Truck/Truck';
import {Link} from 'react-router-dom';

function Trucks() {
  const [trucks, setTrucks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('/api/trucks')
      .then((res) => setTrucks(res.data))
      .catch((err) => setError(err.response.data.error));
  }, []);

  return (
    <div className="trucks">
      <Header />
      <div className="container">
        <h2 className="trucks__title">Your trucks</h2>
        {error && <span className="trucks__error">{error}</span>}
        <div className="trucks__list">
          {trucks.map((truck) => (
            <li className="trucks__item" key={truck.name}>
              <Truck truck={truck} />
            </li>
          ))}
        </div>
        <Link className="trucks__link" to="/create-truck">
          Add truck
        </Link>
      </div>
    </div>
  );
}

export default Trucks;
