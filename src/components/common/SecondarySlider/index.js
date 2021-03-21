import React, { useState, useEffect } from 'react';
import { node, func } from 'prop-types';

import '../../../styles/components/common/_secondary-slider.scss';

const SecondarySlider = ({ children, onMove }) => {
  const [activeChild, setActiveChild] = useState(0);
  const [childWidth, setChildWidth] = useState(0);

  const sliderChildren = document.getElementsByClassName('homeinfo-slider-card');
  const leftOffset = activeChild > 0 ? `-${childWidth * activeChild + 60 * activeChild}px` : 0;

  useEffect(() => {
    if (sliderChildren?.length > 0) {
      setChildWidth(sliderChildren[0].offsetWidth);
    }

    const thereWasRezise = () => {
      setChildWidth(sliderChildren[0].offsetWidth);
    };

    window.addEventListener('resize', thereWasRezise);

    return () => window.removeEventListener('resize', thereWasRezise);
  }, [children, sliderChildren]);

  const onMoveForward = () => {
    if (activeChild < children?.length - 1) {
      const nextActiveChild = activeChild + 1;
      setActiveChild(nextActiveChild);
      onMove && onMove(nextActiveChild);
    }
  };

  const onMoveBackward = () => {
    if (activeChild > 0) {
      const nextActiveChild = activeChild - 1;
      setActiveChild(nextActiveChild);
      onMove && onMove(nextActiveChild);
    }
  };

  return (
    <div className="secondary-slider">
      <div className="secondary-slider-buttons">
        <button type="button" onClick={onMoveForward} className="secondary-slider-arrow prev" />
        {activeChild > 0 && (
          <button type="button" onClick={onMoveBackward} className="secondary-slider-arrow next" />
        )}
      </div>
      <div className="secondary-slider-left-overlay">
        <div
          className="secondary-slider-children slide-to-left"
          style={{ transition: 'left 0.5s linear', left: leftOffset }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

SecondarySlider.propTypes = {
  children: node,
  onMove: func
};

export default SecondarySlider;
