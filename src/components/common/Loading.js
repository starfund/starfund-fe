import React from 'react';
import Loader from 'react-loaders';

const Loading = ({ className = '' }) => (
  <div className={`loading-wrapper ${className}`}>
    <Loader type="ball-scale-multiple" active color="#000" />
  </div>
);

export default Loading;
