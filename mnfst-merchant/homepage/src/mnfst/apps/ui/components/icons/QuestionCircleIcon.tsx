import React from 'react';

interface IQuestionCircleIconProps {
  className?: string;
}

const QuestionCircleIcon: React.SFC<IQuestionCircleIconProps> = (props) => {
  const { className } = props;

  return (
    <svg
      viewBox="0 0 48 48"
      width="48"
      height="48"
      fill="#1da1f2"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M 24 44 C 12.954 44 4 35.046 4 24 C 4 12.954 12.954 4 24 4 C 35.046 4 44 12.954 44 24 C 44 35.046 35.046 44 24 44 Z M 24 40 C 32.836 40 40 32.836 40 24 C 40 15.164 32.836 8 24 8 C 15.164 8 8 15.164 8 24 C 8 32.836 15.164 40 24 40 Z M 24 16 C 21.79 16 20 17.79 20 20 C 20 21.104 19.104 22 18 22 C 16.896 22 16 21.104 16 20 C 16 15.582 19.582 12 24 12 C 28.464 12 32.012 15.21 32.012 19.596 C 32.012 21.992 31.17 23.46 29.374 25.006 C 29.19 25.166 27.112 26.854 27.034 26.916 C 26.2 27.582 26.026 27.882 26.026 28.878 C 26.026 29.982 25.13 30.878 24.026 30.878 C 22.922 30.878 22.026 29.982 22.026 28.878 C 22.026 26.538 22.824 25.16 24.536 23.792 C 24.468 23.844 26.616 22.104 26.766 21.974 C 27.754 21.124 28.012 20.674 28.012 19.596 C 28.012 17.514 26.338 16 24 16 Z M 24 36 C 22.896 36 22 35.104 22 34 C 22 32.896 22.896 32 24 32 C 25.104 32 26 32.896 26 34 C 26 35.104 25.104 36 24 36 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default QuestionCircleIcon;
