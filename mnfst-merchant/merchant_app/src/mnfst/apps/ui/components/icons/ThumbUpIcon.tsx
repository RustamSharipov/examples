import React from 'react';

interface IThumbUpIcon {
  className?: string;
}

const ThumbUpIcon: React.SFC<IThumbUpIcon> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="#000000"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M30.053 40.993c4.44.048 6.641-.85 7.762-3h-.81a1.998 1.998 0 0 1-2.005-2c0-1.105.887-2 2.006-2h2.003l.52-2h-1.523a1.998 1.998 0 0 1-2.006-2c0-1.105.887-2 2.006-2h2.556l.395-1.534c.19-.878-.292-1.467-1.232-1.467h-7.218a4.79 4.79 0 0 1-4.733-5.773c.02-.103.597-3.013.635-3.228.413-2.34.607-4.013.591-4.965v-.14c.011-.596-.352-1.233-1.309-1.978-.107-.084-.81-.51-.81-.51l-5.766 12.464c-1.069 2.31-3.568 3.978-6.115 4.12v16.019c6.346-.002 14.277-.005 15.053-.008zM11 24.993H7v16.01l4-.001v-16.01zm-4 20c-2.21 0-4-1.785-4-3.99v-16.02a3.996 3.996 0 0 1 4-3.99h7.648c1.109 0 2.359-.857 2.836-1.81.478-.954 6.22-13.446 6.22-13.446a2.97 2.97 0 0 1 4.038-1.417s1.456.69 2.408 1.433c1.768 1.378 2.887 3.124 2.85 5.206.022 1.318-.216 3.259-.652 5.728-.117.66-.653 3.322-.653 3.322-.109.543.255.982.812.982h7.218c3.48 0 5.867 2.931 5.149 6.287-.022.113-2.542 10.233-2.998 11.408-1.697 4.593-5.631 6.374-11.866 6.306-2.862.014-23.01 0-23.01 0z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default ThumbUpIcon;
