import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import ChevronIcon from 'apps/ui/components/icons/ChevronIcon';
import styles from './style.css';

interface IBackControl {
  children: React.ReactNode;
  className?: string;
  link: string;
}

const BackControl: React.SFC<IBackControl> = (props) => {
  const { className, children, link } = props;
  return (
    <Link
      className={classNames(
        styles.backControl,
        className,
      )}
      to={link}>
      <ChevronIcon
        className={styles.icon}
        direction="left" />
      <span>{children}</span>
    </Link>
  );
};

export default BackControl;
