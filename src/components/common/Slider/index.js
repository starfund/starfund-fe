import React from 'react';
import { node, object } from 'prop-types';
import SlickSlider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import '../../../styles/components/common/_slider.scss';

const settings = {
  className: 'slider',
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  adaptiveHeight: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
      }
    }
  ]
};

const Slider = ({ children, extraSettings }) => (
  <SlickSlider {...{ ...settings, ...extraSettings }}>{children}</SlickSlider>
);

Slider.propTypes = {
  children: node,
  extraSettings: object
};

export default Slider;
