import React from 'react';

interface ICalendarIconProps {
  className?: string;
}

const CalendarIcon: React.SFC<ICalendarIconProps> = ({ className }): JSX.Element => {
  return (
    <svg
      viewBox="0 0 48 48"
      height="48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M26,32 C27.1054196,32 28,32.8877296 28,34 C28,35.1045695 27.1132936,36 26.0018986,36 L21.9981014,36 C20.8945804,36 20,35.1122704 20,34 C20,32.8954305 20.8867064,32 21.9981014,32 L22,30 C20.8944962,30 20,29.1122704 20,28 C20,26.8954305 20.8982606,26 21.9979131,26 C22.0045547,24.8946432 22.8905821,24 24,24 C25.1045695,24 26,24.9019504 26,26.0085302 L26,32 Z M40,12.0002124 C40,10.8950241 39.1073867,10 38.0098214,10 C38,11.1047419 37.1122704,12 36,12 C34.8954305,12 34,11.1125667 34,10.000385 L30,10 C30,11.1047419 29.1122704,12 28,12 C26.8954305,12 26,11.1125667 26,10.000385 L22,10 C22,11.1047419 21.1122704,12 20,12 C18.8954305,12 18,11.1125667 18,10.000385 L14,10 C14,11.1047419 13.1122704,12 12,12 C10.8954305,12 10,11.1125667 10,10.000385 C8.89145651,10 8,10.8938867 8,12.0002124 L8,16 L40,16 L40,12.0002124 Z M8,20 L8,37.9997876 C8,39.1049759 8.89261326,40 9.99017859,40 L38.0098214,40 C39.1085435,40 40,39.1061133 40,37.9997876 L40,20 L8,20 Z M44,12.0002124 L44,37.9997876 C44,41.3128183 41.3201238,44 38.0098214,44 L9.99017859,44 C6.68105549,44 4,41.3117034 4,37.9997876 L4,12.0002124 C4,8.68718171 6.67987615,6 9.99017859,6 L10,3.99961498 C10,2.89525812 10.8877296,2 12,2 C13.1045695,2 14,2.88743329 14,3.99961498 L14,6 L18,6 L18,3.99961498 C18,2.89525812 18.8877296,2 20,2 C21.1045695,2 22,2.88743329 22,3.99961498 L22,6 L26,6 L26,3.99961498 C26,2.89525812 26.8877296,2 28,2 C29.1045695,2 30,2.88743329 30,3.99961498 L30,6 L34,6 L34,3.99961498 C34,2.89525812 34.8877296,2 36,2 C37.1045695,2 38,2.88743329 38,3.99961498 L38,6 C41.3189445,6 44,8.68829665 44,12.0002124 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

export default CalendarIcon;