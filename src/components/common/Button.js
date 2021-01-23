import React, { memo } from 'react';
import { string, func, oneOf, object } from 'prop-types';
import { useIntl } from 'react-intl';
import cn from 'classnames';

const Button = ({ labelId, onClick, type, icon, className }) => {
  const intl = useIntl();
  return (
    <div className={cn('button', type, className)} onClick={onClick}>
      {icon}
      <h5 className="bold">{intl.formatMessage({ id: labelId })}</h5>
    </div>
  );
};

Button.propTypes = {
  labelId: string.isRequired,
  onClick: func.isRequired,
  type: oneOf(['primary', 'secondary', 'red-hover']),
  icon: object,
  className: string
};

export default memo(Button);
