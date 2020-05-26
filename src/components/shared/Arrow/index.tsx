import React from 'react';

import arrowRight from 'src/images/icons/arrowRight.svg';
import arrowLeft from 'src/images/icons/arrowLeft.svg';

interface ArrowProps{
  className: string;
  direction: 'left'|'right';
}

const Arrow = ({ className, direction }: ArrowProps) => (
  <img
    className={className}
    src={direction === 'left' ? arrowLeft : arrowRight}
    alt="Arrow Icon"
  />
);

export default Arrow;
