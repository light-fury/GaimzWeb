import React from 'react';
import PropTypes from 'prop-types';

import arrowRight from '../../../images/icons/arrowRight.svg';
import arrowLeft from '../../../images/icons/arrowLeft.svg';

const Arrow = ({ className, direction }) => (
  <img
    className={className}
    src={direction === 'left' ? arrowLeft : arrowRight}
    alt="Arrow Icon"
  />
);

Arrow.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']),
};

export default Arrow;
