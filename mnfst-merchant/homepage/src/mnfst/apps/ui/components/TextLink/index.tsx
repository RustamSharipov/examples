import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './style.css';

const themesClassNames = {
  grey: styles.greyTheme,
  sand: styles.sandTheme,
  violet: styles.violetTheme,
  white: styles.whiteTheme,
};

interface ITextLink {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  hasUnderline?: boolean;
  href?: string;
  link?: string;
  onClick?: (event) => void;
  target?: string;
  theme?: string;
}

const TextLink: React.SFC<ITextLink> = (props) => {
  const { children, className, disabled, hasUnderline, href, link, target, theme, onClick } = props;
  const textLinkProps = {
    className: classNames(
      styles.textLink,
      className,
      theme && themesClassNames[theme],
      hasUnderline && styles.hasUnderline,
    ),
    onClick: (event) => {
      if (onClick && !disabled) {
        onClick(event);
      }
    },
  };

  if (href) {
    return (
      <a
        {...textLinkProps}
        href={href}
        target={target}>
        {children}
      </a>
    );
  }

  if (link) {
    return (
      <Link
        {...textLinkProps}
        to={link}
        target={target}>
        {children}
      </Link>
    );
  }

  return (
    <span {...textLinkProps}>
      {children}
    </span>
  );
};

export default TextLink;
