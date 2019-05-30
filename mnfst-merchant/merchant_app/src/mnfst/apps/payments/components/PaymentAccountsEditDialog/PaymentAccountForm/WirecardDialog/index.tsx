import React from 'react';
import { FormRow } from 'apps/ui/components/Form';
import styles from './style.css';

interface IWirecardDialogProps {
  url: string;
}

class WirecardDialog extends React.PureComponent<IWirecardDialogProps> {
  public componentDidMount() {
    const { url } = this.props;
    const { WPP } = window as any;

    WPP.seamlessRender({
      url,
      wrappingDivId: 'payments-wirecard-frame',
      onSuccess: () => {
        console.log();
      },

      onError: () => {
        console.log();
      },
    });
  }

  public render() {
    return (
      <FormRow>
        <div
          className={styles.wirecardDialog}
          id="payments-wirecard-frame" />
      </FormRow>
    );
  }
}

export default WirecardDialog;
