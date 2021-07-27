import React from 'react';

import '../styles/components/common/_whatsapp-cta.scss';
import WhatsappCTA from '../assets/WhatsappCTA.png';

const WhatsappCallToAction = () => {
  const WHATSAPPBUSINESS = 'https://api.whatsapp.com/send?phone=+12029826896';

  return (
    <div className="wpp-cta" onClick={() => window.open(WHATSAPPBUSINESS, '_blank')}>
      <img src={WhatsappCTA} alt="questions?" />
    </div>
  );
};

export default WhatsappCallToAction;
