import React from 'react';
import ModalPopup from 'apps/ui/components/ModalPopup';
import BrandUpdateForm from './BrandUpdateForm';

interface IBrandUpdateDialogProps {
  id?: string;
  isOpen: boolean;
  onClose?: () => void;
}

class BrandUpdateDialog extends React.Component<IBrandUpdateDialogProps> {
  public render() {
    const { id, isOpen } = this.props;
    return (
      <ModalPopup
        className="spec-brand-update-dialog"
        isOpen={isOpen}
        onClose={this.closePopup}>
        <BrandUpdateForm
          id={id}
          onClose={this.closePopup} />
      </ModalPopup>
    );
  }

  private closePopup = () => {
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }
}

export default BrandUpdateDialog;
