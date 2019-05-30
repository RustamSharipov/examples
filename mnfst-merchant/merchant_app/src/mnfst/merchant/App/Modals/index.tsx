import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dialog, DialogContent } from 'apps/ui/components/Dialog';
import ModalPopup from 'apps/ui/components/ModalPopup';
import { IModalsReducer, IModalsActions } from 'apps/base/interfaces/modals';
import * as ModalsActions from 'apps/base/actions/ModalsActions';

interface IModalsProps {
  modals: IModalsReducer;
  ModalsActions: IModalsActions;
}

class Modals extends React.Component<IModalsProps> {
  public render() {
    const { modal, text } = this.props.modals;

    if (modal) {
      return (
        <ModalPopup
          isOpen={true}
          onClose={this.handleClose}>
          {modal}
        </ModalPopup>
      );
    }

    if (text) {
      return (
        <ModalPopup
          isOpen={true}
          onClose={this.handleClose}>
          <Dialog>
            <DialogContent>
              {text}
            </DialogContent>
          </Dialog>
        </ModalPopup>
      );
    }

    return null;
  }

  private handleClose = () => {
    this.props.ModalsActions.close();
  }
}

function mapStateToProps(state) {
  return {
    modals: state.modals,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ModalsActions: bindActionCreators(ModalsActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Modals);
