import React from 'react';

interface ArrowProps {
  color: string;
  direction: 'left' | 'right';
  size: number;
}

const Arrow = ({ color, direction, size }: ArrowProps) => {
  if (direction === 'left') {
    return (
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.71 4.41L8.11996 9L12.71 13.59L11.29 15L5.28996 9L11.29 3L12.71 4.41Z"
          fill={color}
        />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.29004 4.41L9.88004 9L5.29004 13.59L6.71004 15L12.71 9L6.71004 3L5.29004 4.41Z"
        fill={color}
      />
    </svg>
  );
};

export default Arrow;
