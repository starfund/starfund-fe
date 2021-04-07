import React from 'react';
import { useSelector } from 'react-redux';

import { LANGUAGE_OPTIONS } from 'constants/constants';
import useDispatch from '../../../hooks/useDispatch';
import { setLanguage } from '../../../state/actions/appActions';
import languageIcon from '../../../assets/translation.svg';
import DropDown from '../DropDown';

const LanguageDropDown = () => {
  const setLanguageRequest = useDispatch(setLanguage);
  const locale = useSelector(({ language }) => language.language);

  return (
    <div className="language-dropdown-container">
      <img className="language-dropdown-image" src={languageIcon} alt="language" />
      <DropDown options={LANGUAGE_OPTIONS} onChange={setLanguageRequest} value={locale} />
    </div>
  );
};

export default LanguageDropDown;
