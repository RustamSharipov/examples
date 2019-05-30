import React from 'react';

interface ITwoSquaresIcon {
  className?: string;
}

const TwoSquaresIcon: React.SFC<ITwoSquaresIcon> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="#000000"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path fill="#000" d="M12 .667v2a.665.665 0 0 1-.667.666.665.665 0 0 1-.666-.666V1.333H9.333a.665.665 0 0 1-.666-.666c0-.369.295-.667.666-.667h2A.665.665 0 0 1 12 .667zm0 6.666v-2a.665.665 0 0 0-.667-.666.665.665 0 0 0-.666.666v1.334H9.333a.665.665 0 0 0-.666.666c0 .371.298.667.666.667h2A.664.664 0 0 0 12 7.333zM4 .667v2c0 .37.298.666.667.666.37 0 .666-.298.666-.666V1.333h1.334c.37 0 .666-.298.666-.666A.665.665 0 0 0 6.667 0h-2A.664.664 0 0 0 4 .667z" opacity=".1"/>
      <path fill="#674FF1" d="M0 4.668C0 4.3.299 4 .668 4h6.664C7.7 4 8 4.299 8 4.668v6.664c0 .369-.299.668-.668.668H.668A.668.668 0 0 1 0 11.332V4.668zm1.329 6l5.338.004.003-5.339H1.342l-.013 5.334z"/>
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default TwoSquaresIcon;
