import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { getFighters } from '../state/actions/fighterActions';

const HomeStars = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getFighters());
  }, [dispatch]);
  const fighters = useSelector(state => state.fighters.fighters);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="stars-container">
      <h1> Featured Athletes </h1>
      <div className="fighters-container">
        <Slider {...settings}>
          <div>
            <h3>1</h3>
          </div>
          {fighters.length > 0 &&
            fighters.map(f => (
              <div key={f.id} className="card fighter-card">
                <img className="card-img-top" src={f?.profilePicture} alt="Card cap" />
                <div className="card-body">
                  <a
                    href="#"
                    className="card-text"
                    onClick={() => history.push(`/fighter/${f.id}`)}
                  >
                    {f.firstName} {f.lastName}
                  </a>
                </div>
              </div>
            ))}
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default HomeStars;
