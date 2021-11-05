import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import styled from 'styled-components';
import { LANGUAGE_OPTIONS } from 'constants/constants';
import { useMediaQuery } from 'react-responsive';
import useDispatch from '../../../hooks/useDispatch';
import { setLanguage } from '../../../state/actions/appActions';

const LanguageSelect = () => {
  const setLanguageRequest = useDispatch(setLanguage);
  const locale = useSelector(({ language }) => language.language);
  const isMobile = useMediaQuery({
    query: '(max-width: 992px)'
  });
  const Button = styled.button``;
  const ButtonToggle = styled(Button)`
    background-color: #373737;
    color: white;
    width: 3vw;
    height: 4vh;
    padding: 3px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    ${({ active }) =>
      active &&
      `
      background-color: red;
    `}
  `;
  const ButtonToggleMobile = styled(Button)`
    background-color: #373737;
    color: white;
    width: 10vw;
    height: 6vh;
    padding: 3px;
    font-family: Montserrat;
    font-style: normal;
    font-weight: 500 !important;
    font-size: 15px;
    line-height: 18px;
    text-align: center;
    ${({ active }) =>
      active &&
      `
      background-color: red;
    `}
  `;
  const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
  `;
  const types = LANGUAGE_OPTIONS.map(o => o.value.toUpperCase());
  const [active, setActive] = useState(locale.toUpperCase());

  return (
    <div
      className={isMobile ? 'language-dropdown-container-mobile' : 'language-dropdown-container'}
    >
      <ButtonGroup>
        {!isMobile &&
          types.map(type => (
            <ButtonToggle
              key={type}
              active={active === type}
              onClick={() => {
                setActive(type);
                setLanguageRequest(type.toLocaleLowerCase());
              }}
            >
              {type}
            </ButtonToggle>
          ))}
        {isMobile &&
          types.map(type => (
            <ButtonToggleMobile
              key={type}
              active={active === type}
              onClick={() => {
                setActive(type);
                setLanguageRequest(type.toLocaleLowerCase());
              }}
            >
              {type}
            </ButtonToggleMobile>
          ))}
      </ButtonGroup>
    </div>
  );
};

export default LanguageSelect;
