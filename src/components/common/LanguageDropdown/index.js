import React, { useContext } from 'react';

import { LANGUAGE_OPTIONS } from 'constants/constants';
import languageIcon from '../../../assets/translation.svg';
import LanguageContext from '../../../Contexts/LanguageContext';

import DropDown from '../DropDown';

const LanguageDropDown = () => {
  const setLanguage = useContext(LanguageContext);
  return (
    <div className="language-dropdown-container">
      <img className="language-dropdown-image" src={languageIcon} alt="language" />
      <DropDown options={LANGUAGE_OPTIONS} onChange={setLanguage} />
    </div>
  );
};

export default LanguageDropDown;
