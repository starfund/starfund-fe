import React from 'react';
import { Map, Marker } from 'pigeon-maps';

const LocationMap = () => {
  return (
    <div className="center-70">
      <Map height={350} defaultCenter={[-34.901229595281514, -56.17219938349039]} defaultZoom={16}>
        <Marker width={35} anchor={[-34.901229595281514, -56.17219938349039]} />
      </Map>
    </div>
  );
};

export default LocationMap;
