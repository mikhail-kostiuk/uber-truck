import React from 'react';
import './Home.scss';
import Header from '../../components/Header/Header';
import Intro from '../../components/Intro/Intro';

function Home() {
  return (
    <div className="home">
      <Header />
      <div className="home__intro home__intro--driver">
        <Intro
          title="Get in the driver's seat and get paid"
          text={`Drive on the platform with the 
            largest network of active riders.`}
        />
      </div>
      <div className="home__intro home__intro--shipper">
        <Intro
          title="Move your loads fast and secure"
          text={`Uber Truck helps to simplify moving, 
            expensing, and customer experiences.`}
        />
      </div>
    </div>
  );
}

export default Home;
