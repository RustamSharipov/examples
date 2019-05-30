import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IModalPopupProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

class ModalPopup extends React.Component<IModalPopupProps> {
  public render() {
    const { children, className, isOpen } = this.props;

    if (isOpen) {
      return (
        <div className={classNames(
          styles.modalPopup,
          className,
        )}>
          <div
            className={styles.backDrop}
            onClick={this.handleBackDropClick} />
          <div className={styles.content}>
            {children}
          </div>
        </div>
      );
    }

    return null;
  }

  private handleBackDropClick = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }
}

export default ModalPopup;
