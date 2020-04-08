import React from 'react';
import './Truck.scss';

function Truck(props) {
  const {name, type, capacity} = props.truck;

  return (
    <div className="truck">
      <div className="truck__property">
        <span className="truck__label">Name:</span>
        <span className="truck__text">{name}</span>
      </div>
      <div className="truck__property">
        <span className="truck__label">Type:</span>
        <span className="truck__text">{type}</span>
      </div>
      <div className="truck__property">
        <span className="truck__label">Payload:</span>
        <span className="truck__text">{capacity.payload}</span>
      </div>
      <div className="truck__property">
        <span className="truck__label">Dimensions:</span>
      </div>
      <div className="truck__property truck__property--nested">
        <span className="truck__label">Width:</span>
        <span className="truck__text truck__text--nested">
          {capacity.dimensions.width}
        </span>
      </div>
      <div className="truck__property truck__property--nested">
        <span className="truck__label">Length:</span>
        <span className="truck__text truck__text--nested">
          {capacity.dimensions.length}
        </span>
      </div>
      <div className="truck__property truck__property--nested">
        <span className="truck__label">Height:</span>
        <span className="truck__text truck__text--nested">
          {capacity.dimensions.height}
        </span>
      </div>
    </div>
  );
}

export default Truck;
