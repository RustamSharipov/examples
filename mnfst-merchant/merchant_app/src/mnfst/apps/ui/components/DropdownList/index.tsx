import React from 'react';
import enhanceWithClickOutside from 'react-click-outside';
import classNames from 'classnames';
import { IFormTarget, IClassNames } from 'interfaces';
import styles from './style.css';

const alignmentClassNames = {
  right: styles.rightAlignment,
};

interface IDropdownListItemProps {
  children: React.ReactNode;
  className?: string;
  isHighlighted?: boolean;
  isSelected?: boolean;
  onClick?: (props: IFormTarget) => void;
  name: string;
  value: any;
}

interface IDropdownListItemsProps {
  alignment?: string;
  autoWidth?: boolean;
  children: React.ReactNode;
  className?: string;
  classNamesList?: IClassNames;
  forceDropdownListPosition?: string;
  isOpened: boolean;
  onClickOutside?: () => void;
}

interface IDropdownListProps {
  className?: string;
  classNamesList?: IClassNames;
  disabled?: boolean;
  forceDropdownListPosition?: string;
  isOpened: boolean;
  // tslint:disable
  items: Array<{[name: string]: any}>;
  // tslint:enable
  name?: string;
  onBlur?: () => void;
  onSelect: (target: IFormTarget) => void;
  value: any;
}

export const DropdownListItem: React.SFC<IDropdownListItemProps> = (props) => {
  const { children, className, isHighlighted, isSelected, name, value, onClick } = props;
  return (
    <li
      className={classNames(
        styles.item,
        isSelected && styles.isSelected,
        isHighlighted && styles.isHighlighted,
        className,
      )}
      onClick={() => onClick && onClick({ name, value })}>
      {children}
    </li>
  );
};

class DropdownListItemsOrigin extends React.Component<IDropdownListItemsProps> {
  public handleClickOutside = () => {
    const { onClickOutside } = this.props;
    if (onClickOutside) {
      onClickOutside();
    }
  }

  public render() {
    const {
      alignment, autoWidth, children, className, classNamesList, forceDropdownListPosition, isOpened,
    } = this.props;
    const alignmentClassName = alignment && alignmentClassNames[alignment];

    return (
      <div className={classNames(
        styles.dropdownListItems,
        autoWidth && styles.autoWidth,
        alignmentClassName,
        className,
        forceDropdownListPosition === 'center' && styles.dropdownListPositionCenter,
      )}>
        <ul className={classNames(
          styles.items,
          classNamesList && classNamesList.items,
          isOpened && styles.isOpened,
        )}>
          {children}
        </ul>
      </div>
    );
  }
}

export const DropdownListItems = (props) => {
  const Component = enhanceWithClickOutside(DropdownListItemsOrigin);
  return <Component {...props} />;
};

const DropdownList: React.SFC<IDropdownListProps> = (props) => {
  const { className, classNamesList, forceDropdownListPosition, isOpened, items, value, onBlur, onSelect } = props;
  const withImages = items.filter(item => item.image).length > 0;

  return (
    <DropdownListItems
      className={className}
      classNamesList={{
        items: classNamesList && classNamesList.items,
      }}
      forceDropdownListPosition={forceDropdownListPosition}
      isOpened={isOpened}
      onClickOutside={onBlur}>
      {items.map((item, index) => (
        <DropdownListItem
          key={index}
          className={classNames(
            item.className,
            classNamesList && classNamesList.item,
          )}
          isHighlighted={item.isHighlighted}
          isSelected={String(item.value) === String(value)}
          name={item.name}
          onClick={onSelect && onSelect}
          value={item.value}>
          {item.iconBefore && (
            <span className={styles.iconBefore}>
              {item.iconBefore}
            </span>
          )}
          {item.image && (
            <img
              className={styles.image}
              src={item.image}
              width="16"
              height="16"
              alt={item.name} />
          )}
          {(withImages && !item.image) && (
            <span className={styles.image} />
          )}
          <span className={styles.name}>
            {item.name}
          </span>
        </DropdownListItem>
      ))}
    </DropdownListItems>
  );
};

export default DropdownList;
