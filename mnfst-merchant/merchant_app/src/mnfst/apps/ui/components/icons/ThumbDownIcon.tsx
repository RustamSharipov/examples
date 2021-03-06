import React from 'react';

interface IThumbDownIcon {
  className?: string;
}

const ThumbDownIcon: React.SFC<IThumbDownIcon> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="#000000"
      width="48"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M37.006 15.006a1.996 1.996 0 0 1-2.006-2c0-1.112.898-2 2.006-2h.81c-1.122-2.151-3.322-3.048-7.763-3C29.277 8.002 15 8.001 15 8.001v16.015c2.547.143 5.046 1.81 6.115 4.12L26.88 40.6s.703-.426.81-.51c.957-.745 1.32-1.381 1.31-1.978v-.14c.015-.951-.179-2.624-.592-4.965a765.66 765.66 0 0 0-.635-3.227 4.79 4.79 0 0 1 4.733-5.773h7.218c.94 0 1.421-.59 1.232-1.467l-.395-1.534h-2.556a1.996 1.996 0 0 1-2.006-2c0-1.112.898-2 2.006-2h1.523c-.178-.684-.354-1.366-.52-2h-2.003zM7 7.996v16.01h4V8l-4-.004zm0-3.99s20.148-.014 23.01 0c6.235-.067 10.17 1.714 11.866 6.307.456 1.175 2.976 11.295 2.998 11.408.718 3.355-1.669 6.286-5.15 6.286h-7.217c-.557 0-.92.44-.812.983 0 0 .536 2.662.653 3.322.436 2.469.674 4.41.652 5.728.037 2.082-1.082 3.828-2.85 5.206-.952.742-2.408 1.433-2.408 1.433a2.97 2.97 0 0 1-4.037-1.417s-5.743-12.492-6.22-13.446c-.478-.954-1.728-1.81-2.837-1.81H6.999C4.792 28.006 3 26.22 3 24.016V7.996c0-2.205 1.79-3.99 4-3.99z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default ThumbDownIcon;
