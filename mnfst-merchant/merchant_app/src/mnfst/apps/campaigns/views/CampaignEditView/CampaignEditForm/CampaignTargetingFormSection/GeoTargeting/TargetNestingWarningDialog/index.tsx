import React from 'react';
import ModalPopup from 'apps/ui/components/ModalPopup';
import Button from 'apps/ui/components/Button';
import ButtonsSet from 'apps/ui/components/ButtonsSet';
import { Dialog, DialogContent, DialogControls } from 'apps/ui/components/Dialog';
import { getLocalData } from 'apps/ui/utils/localization';
import styles from './style.css';
import { IGeoTarget } from 'apps/campaigns/interfaces/campaignGeoTargeting';
import { Regions } from 'utils/regions';

interface ITargetNestingWarningDialogProps {
  geoTarget: IGeoTarget;
  isOpen: boolean;
  onApply: () => void;
  onClose: () => void;
}

const TargetNestingWarningDialog: React.SFC<ITargetNestingWarningDialogProps> = (props) => {
  const { geoTarget, isOpen, onClose, onApply } = props;
  const countryName = Regions.getCountries({ cca2: geoTarget.country_code })[0].name.common;

  return (
    <ModalPopup
      isOpen={isOpen}
      onClose={onClose}>
      <Dialog>
        <DialogContent className={styles.targetNestingWarningModalContent}>
          <div className="title-2">
            {getLocalData('ui.alerts.nestedTargeting.title')}
          </div>
          <p dangerouslySetInnerHTML={{
            __html: geoTarget.kind === 'country'
              ? getLocalData('ui.alerts.nestedTargeting.removePins', {
                placeholders: { countryName },
              })
              : getLocalData('ui.alerts.nestedTargeting.removeCountrywide', {
                placeholders: { countryName },
              }),
          }} />
        </DialogContent>
        <DialogControls>
          <ButtonsSet>
            <Button
              onClick={onClose}
              theme="white">
              {getLocalData('ui.alerts.nestedTargeting.cancelButton')}
            </Button>
            <Button
              onClick={onApply}
              theme="violet">
              {getLocalData('ui.alerts.nestedTargeting.applyButton')}
            </Button>
          </ButtonsSet>
        </DialogControls>
      </Dialog>
    </ModalPopup>
  );
};

export default TargetNestingWarningDialog;
