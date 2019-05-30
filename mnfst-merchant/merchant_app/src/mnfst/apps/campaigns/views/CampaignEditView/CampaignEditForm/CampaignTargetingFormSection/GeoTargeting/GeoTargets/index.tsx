import React from 'react';
import AСrossIcon from 'apps/ui/components/icons/ACrossIcon';
import MapIcon from 'apps/ui/components/icons/MapIcon';
import RangeInput from 'apps/ui/components/RangeInput';
import { getLocalString } from 'utils/localization';
import styles from './style.css';
import { Regions } from 'utils/regions';

interface IGeoTargetItemProps {
  id: string;
  countryCode: string;
  isEditable?: boolean;
  kind: 'country' | 'circle';
  lat: number;
  lng: number;
  name?: string;
  onClick: (id: string) => void;
  onRadiusChange?: (id: string, radius: number) => void;
  onRemove: (id: string) => void;
  radius?: number;
}

interface IGeoTargetsProps {
  children: React.ReactNode;
}
export class GeoTargetItem extends React.PureComponent<IGeoTargetItemProps> {
  public render() {
    const {
      countryCode: cca2,
      isEditable,
      kind,
      lat,
      lng,
      name,
      radius,
    } = this.props;
    const country = cca2 && Regions.getCountries({ cca2 })[0];
    const countryName = country ? country.name.common : name;

    return (
      <div
        className={styles.geoTargetItem}
        onClick={this.handleClick}>
        <MapIcon className={styles.locationIcon} />
        <div className={styles.location}>
          <div className={styles.locationName}>
            {kind === 'country' && countryName}
            {(kind === 'circle' && name) && name}
            {(!name && lat && lng) && `${lng.toFixed(4)}, ${lat.toFixed(4)}`}
            {(kind === 'circle' && radius) && (
              <span className={styles.locationNameText}>
                {`+${radius} km`}
              </span>
            )}
          </div>
          <div>
            <span className={styles.locationCountry}>
              {kind === 'country' && getLocalString('pages.campaigns.create.targeting.countryWide')}
              {kind === 'circle' && countryName}
            </span>
          </div>
        </div>
        {(isEditable && kind === 'circle') && (
          <div
            className={styles.locationRadius}
            onClick={this.cancelPropagation}>
            <RangeInput
              defaultValue={String(radius)}
              max={100}
              min={5}
              onChange={this.handleRangeChange}
              step={1} />
          </div>
        )}
        {isEditable && (
          <div onClick={this.handleRemove}>
            <AСrossIcon className={styles.removeIcon} />
          </div>
        )}
      </div>
    );
  }

  private handleRangeChange = (event) => {
    const { value } = event.target;
    const { id, onRadiusChange } = this.props;

    if (onRadiusChange) {
      onRadiusChange(id, +value);
    }
  }

  private handleClick = () => {
    const { id, onClick } = this.props;
    if (onClick) {
      onClick(id);
    }
  }

  private cancelPropagation = (event) => {
    event.stopPropagation();
  }

  private handleRemove = (event) => {
    this.cancelPropagation(event);
    const { id, onRemove } = this.props;

    if (onRemove) {
      onRemove(id);
    }
  }
}

export const GeoTargets: React.SFC<IGeoTargetsProps> = (props) => {
  const { children } = props;

  return (
    <div className={styles.geoTargets}>
      {children}
    </div>
  );
};
