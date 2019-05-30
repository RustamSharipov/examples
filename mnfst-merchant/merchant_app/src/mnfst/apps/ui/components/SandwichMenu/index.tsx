import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ISandwichMenuProps {
  className?: string;
  isActive: boolean;
  onClick: () => void;
}

const SandwichMenu: React.SFC<ISandwichMenuProps> = (props) => {
  const { className, isActive, onClick } = props;
  return (
    <span
      className={classNames(
        styles.sandwichMenu,
        isActive && styles.isActive,
        className,
      )}
      onClick={onClick && onClick} />
  );
};

export default SandwichMenu;
