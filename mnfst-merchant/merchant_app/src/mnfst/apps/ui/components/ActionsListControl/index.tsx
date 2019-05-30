import React from 'react';
import classNames from 'classnames';
import ControlIcon from 'apps/ui/components/ControlIcon';
import { DropdownListItems, DropdownListItem } from 'apps/ui/components/DropdownList';
import ThreeDotsIcon from 'apps/ui/components/icons/ThreeDotsIcon';
import { IActionItem, IClassNames } from 'interfaces';
import styles from './style.css';

interface IPaymentAccountProps {
  // ToDo: Fix type
  // tslint:disable
  actionsList: Array<IActionItem<string>>;
  // tslint:enable
  className?: string;
  classNamesList?: IClassNames;
}

interface IPaymentAccountState {
  isDisplayActionsList: boolean;
}

class ActionsListControl extends React.PureComponent<IPaymentAccountProps, IPaymentAccountState> {
  public state = {
    isDisplayActionsList: false,
  };

  public render() {
    const { actionsList, className, classNamesList } = this.props;
    const { isDisplayActionsList } = this.state;

    return (
      <div className={classNames(
        styles.actionsListControl,
        className,
      )}>
        <div
          className={classNames(
            styles.control,
            classNamesList && classNamesList.control,
          )}
          onClick={this.handleActionsClick}>
          <ControlIcon>
            <ThreeDotsIcon className={styles.controlIcon} />
          </ControlIcon>
        </div>
        <DropdownListItems
          alignment="right"
          autoWidth={true}
          className={classNamesList && classNamesList.items}
          isOpened={isDisplayActionsList}
          onClickOutside={this.handleDropdownClickOutside}>
          {actionsList.map(action => (
            <DropdownListItem
              key={action.id}
              className={classNames(
                styles.item,
                classNamesList && classNamesList.item,
              )}
              name={action.name}
              onClick={() => this.handleActionClick(action, action.onClick)}
              value={action.value}>
              {action.name}
            </DropdownListItem>
          ))}
        </DropdownListItems>
      </div>
    );
  }

  private handleActionsClick = () => {
    this.setState({ isDisplayActionsList: true });
  }

  private handleDropdownClickOutside = () => {
    this.setState({ isDisplayActionsList: false });
  }

  private handleActionClick = (action: IActionItem<string>, onClick?: (action: IActionItem<string>) => void) => {
    this.setState({ isDisplayActionsList: false });

    if (onClick) {
      onClick(action);
    }
  }
}

export default ActionsListControl;
