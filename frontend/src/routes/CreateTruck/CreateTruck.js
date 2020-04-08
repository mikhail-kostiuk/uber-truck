import React from 'react';
import './CreateTruck.scss';
import Header from '../../components/Header/Header';
import CreateTruckForm from '../../components/Forms/CreateTruckForm';

function CreateTruck(props) {
  return (
    <div className="create-truck">
      <Header />
      <div className="create-truck__form">
        <CreateTruckForm history={props.history} />
      </div>
    </div>
  );
}

export default CreateTruck;
