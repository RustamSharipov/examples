import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import ControlIcon from 'apps/ui/components/ControlIcon';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

const dockVariantsClassNames = {
  bottom: styles.dockBottom,
  left: styles.dockLeft,
  'left-right': styles.dockLeftRight,
  right: styles.dockRight,
  top: styles.dockTop,
};

const themesClassNames = {
  grey: styles.greyTheme,
  sand: styles.sandTheme,
  'grey-transparent': styles.greyTransparentTheme,
  red: styles.redTheme,
  violet: styles.violetTheme,
  'violet-border': styles.violetBorderTheme,
  'violet-transparent': styles.violetTransparentTheme,
  'violet-readonly': styles.violetReadonlyTheme,
  white: styles.whiteTheme,
  'white-transparent': styles.whiteTransparentTheme,
};

const sizesClassNames = {
  small: styles.smallSize,
  large: styles.largeSize,
};

interface IButtonProps {
  autoWidth?: boolean;
  children: React.ReactNode;
  className?: string | null | undefined;
  disabled?: boolean;
  dockTo?: string | null | undefined;
  elementType?: string;
  href?: string;
  iconAfter?: React.ReactNode;
  iconBefore?: React.ReactNode;
  link?: any;
  name?: string;
  onClick?: (target: IFormTarget) => void;
  onMouseEnter?: (target: IFormTarget) => void;
  onMouseLeave?: (target: IFormTarget) => void;
  size?: string;
  theme?: string;
  type?: 'button' | 'submit' | 'reset';
  value?: any;
}

interface IButtonStubProps {
  className?: string;
}

class Button extends React.PureComponent<IButtonProps> {
  public render() {
    const {
      autoWidth, className, children, disabled, dockTo, elementType, href, iconBefore, iconAfter, link,
      name, size, theme, type, value,
    } = this.props;

    const dockVariantClassName = dockTo && dockVariantsClassNames[dockTo];
    const sizeClassName = size && sizesClassNames[size];
    const themeClassName = theme && themesClassNames[theme];

    const buttonProps = {
      disabled,
      className: classNames(
        styles.button,
        className,
        autoWidth && styles.autoWidth,
        disabled && styles.isDisabled,
        dockVariantClassName,
        sizeClassName,
        themeClassName,
        iconAfter && styles.withIconAfter,
        iconBefore && styles.withIconBefore,
      ),
      onClick: this.handleClick,
      onMouseEnter: this.handleMouseEnter,
      onMouseLeave: this.handleMouseLeave,
    };

    const Component = () => {
      return (
        <React.Fragment>
          {iconBefore && (
            <ControlIcon
              appendTo="before"
              className={styles.icon}>
              {iconBefore}
            </ControlIcon>
          )}
          <span className={styles.label}>
            {children}
          </span>
          {iconAfter && (
            <ControlIcon
              appendTo="after"
              className={styles.icon}>
              {iconAfter}
            </ControlIcon>
          )}
        </React.Fragment>
      );
    };

    if (href) {
      return (
        <a
          {...buttonProps}
          href={href}>
          <Component />
        </a>
      );
    }

    if (link) {
      return (
        <Link
          {...buttonProps}
          to={link}>
          <Component />
        </Link>
      );
    }

    if (elementType === 'span') {
      return (
        <span {...buttonProps}>
          <Component />
        </span>
      );
    }

    if (elementType === 'div') {
      return (
        <div {...buttonProps}>
          <Component />
        </div>
      );
    }

    if (elementType === 'label') {
      return (
        <label {...buttonProps}>
          <Component />
        </label>
      );
    }

    return (
      <button
        {...buttonProps}
        name={name}
        type={type}
        value={value}>
        <Component />
      </button>
    );
  }

  private handleClick = (event: any) => {
    const { onClick, value } = this.props;
    const { name } = event.target;

    if (onClick) {
      onClick({ name, value });
    }
  }

  private handleMouseEnter = (event: any) => {
    const { onMouseEnter, value } = this.props;
    const { name } = event.target;

    if (onMouseEnter) {
      onMouseEnter({ name, value });
    }
  }

  private handleMouseLeave = (event: any) => {
    const { onMouseLeave, value } = this.props;
    const { name } = event.target;

    if (onMouseLeave) {
      onMouseLeave({ name, value });
    }
  }
}

export default Button;

export const ButtonStub: React.SFC<IButtonStubProps> = (props) => {
  const { className } = props;
  return (
    <span className={classNames(
      styles.button,
      styles.buttonStub,
      className,
    )} />
  );
};
