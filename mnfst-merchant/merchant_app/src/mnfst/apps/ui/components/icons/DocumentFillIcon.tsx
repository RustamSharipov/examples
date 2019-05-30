import React from 'react';

interface IDocumentIconProps {
  className?: string;
  size?: number | string;
}

const DocumentIcon: React.SFC<IDocumentIconProps> = ({ className, size }) => {
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}>
      {/* tslint:disable:max-line-length */}
      <path d="M22,8 L11.9909413,8 L12,39.9999745 L35.9957423,40 C35.9957423,40 36.0001766,28.3434109 36.0001145,22 L24,22 C22.8954305,22 22,21.1045695 22,20 L22,8 Z M26,18 L35.9999993,18 L26,8 L26,18 Z M11.9909413,4 L26.6055819,4 C27.1573996,4 27.923594,4.31897704 28.3066744,4.70220075 L39.2980619,15.6977016 C39.6857316,16.0855164 40,16.8559261 40,17.3985099 L40,40.0014572 C40,42.2097914 38.2109725,44 35.9957423,44 L12.0042577,44 C9.79276724,44 8,42.2035752 8,39.9999745 L8,8.00002553 C8,5.79087243 9.79176129,4 11.9909413,4 Z M14,34 C14,32.8954305 14.8982124,32 15.9907951,32 L32.0092049,32 C33.1086907,32 34,32.8877296 34,34 C34,35.1045695 33.1017876,36 32.0092049,36 L15.9907951,36 C14.8913093,36 14,35.1122704 14,34 Z M14,28 C14,26.8954305 14.9019504,26 16.0085302,26 L23.9914698,26 C25.1007504,26 26,26.8877296 26,28 C26,29.1045695 25.0980496,30 23.9914698,30 L16.0085302,30 C14.8992496,30 14,29.1122704 14,28 Z" />
      {/* tslint:enable:max-line-length */}
    </svg>
  );
};

DocumentIcon.defaultProps = {
  size: 48,
};

export default DocumentIcon;