import React from 'react';

import Status from 'components/routes/Status';

const NotFoundPage = () => {
  if (window.location.href.indexOf('product_page') > -1) {
    return window.location.replace('https://www.fanspace.co');
  }
  if (window.location.href.indexOf('product-page') > -1) {
    return window.location.replace('https://www.fanspace.co');
  }

  return (
    <Status code={404}>
      <div>
        <p>404 page not found :(</p>
      </div>
    </Status>
  );
};

export default NotFoundPage;
