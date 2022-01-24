import React from 'react';
import { useMediaQuery } from 'react-responsive';

const StoreCard = ({ merchItem }) => {
  const isMobile = useMediaQuery({
    query: '(max-width: 765px)'
  });

  const isMobileBig = useMediaQuery({
    query: '(max-width: 1024px)'
  });

  const isBig = useMediaQuery({
    query: '(max-width: 2200px)'
  });

  const getCardWidth = () => {
    if (isMobile) {
      return '65vw';
    }
    if (isMobileBig) {
      return '20vw';
    }
    return '15vw';
  };

  const getPhotoHeight = () => {
    if (isMobile || isBig) {
      return '30vh';
    }
    if (isMobileBig) {
      return '20vh';
    }
    return '40vh';
  };

  return (
    <div
      className="card card-ppv"
      style={{
        width: getCardWidth(),
        backgroundColor: '#373737',
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: isMobileBig ? '-25px' : '-30px',
        marginRight: isMobileBig ? '-25px' : '-30px'
      }}
    >
      <img
        className="card-img-top"
        src={merchItem?.photo}
        style={{ height: getPhotoHeight() }}
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title-ppv">{merchItem?.name}</h5>
        <p className="card-text-ppv">{`${merchItem?.price}$`}</p>
      </div>
    </div>
  );
};

export default StoreCard;
