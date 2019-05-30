import React from 'react';
import classNames from 'classnames';
import Button from 'apps/ui/components/Button';
import styles from './style.css';

const sizesClassNames = {
  small: styles.smallSize,
};

const LandingButton = (props) => {
  const { children, size } = props;

  const sizeClassName = size && sizesClassNames[size];

  return (
    <Button
      {...props}
      className={classNames(
        styles.button,
        sizeClassName,
        props.className,
      )}>
      {children}
    </Button>
  );
};

export default LandingButton;
