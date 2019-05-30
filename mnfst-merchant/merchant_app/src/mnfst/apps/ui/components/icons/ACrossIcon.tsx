import React from 'react';

interface IAСrossIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const AСrossIcon: React.SFC<IAСrossIconProps> = (props) => {
  const { className, width, height } = props;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M39.4141889,11.4142382 C40.1952511,10.6332033 40.1952732,9.3668733 39.4142382,8.5858111 C38.6332033,7.8047489 37.3668733,7.80472681 36.5858111,8.58576178 L24,21.1711339 L11.4141889,8.58576178 C10.6331267,7.80472681 9.36679674,7.8047489 8.58576178,8.5858111 C7.80472681,9.3668733 7.8047489,10.6332033 8.5858111,11.4142382 L21.1715235,23.9995117 L8.5858111,36.5847852 C7.8047489,37.3658202 7.80472681,38.6321501 8.58576178,39.4132123 C9.36679674,40.1942745 10.6331267,40.1942966 11.4141889,39.4132617 L24,26.8278895 L36.5858111,39.4132617 C37.3668733,40.1942966 38.6332033,40.1942745 39.4142382,39.4132123 C40.1952732,38.6321501 40.1952511,37.3658202 39.4141889,36.5847852 L26.8284765,23.9995117 L39.4141889,11.4142382 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

AСrossIcon.defaultProps = {
  width: 48,
  height: 48,
};

export default AСrossIcon;
