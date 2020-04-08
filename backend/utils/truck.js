const trucksProps = {
  'SPRINTER': {
    payload: 1700,
    dimensions: {
      width: 300,
      length: 250,
      height: 170,
    },
  },
  'SMALL STRAIGHT': {
    payload: 2500,
    dimensions: {
      width: 500,
      length: 250,
      height: 170,
    },
  },
  'LARGE STRAIGHT': {
    payload: 4000,
    dimensions: {
      width: 700,
      length: 350,
      height: 200,
    },
  },
};

function getTruckDimensions(type) {
  return trucksProps[type].dimensions;
}
function getTruckPayload(type) {
  return trucksProps[type].payload;
}

module.exports = {getTruckDimensions, getTruckPayload};
