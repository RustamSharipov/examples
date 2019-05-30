import React from 'react';
import classNames from 'classnames';
import ControlIcon from 'apps/ui/components/ControlIcon';
import { DropdownListItem, DropdownListItems } from 'apps/ui/components/DropdownList';
import TextLink from 'apps/ui/components/TextLink';
import ThreeDotsIcon from 'apps/ui/components/icons/ThreeDotsIcon';
import { localizeString } from 'utils/localization';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

const actionsList = [
  {
    id: 1,
    className: styles.actionItem,
    name: localizeString('Copy'),
    value: 'copy',
  },
  {
    id: 2,
    className: styles.actionItem,
    name: localizeString('Edit'),
    value: 'edit',
  },
  {
    id: 3,
    className: styles.actionItem,
    name: localizeString('Remove'),
    value: 'remove',
  },
  {
    id: 4,
    className: styles.actionItem,
    name: localizeString('Resume'),
    value: 'resume',
  },
  {
    id: 5,
    className: styles.actionItem,
    name: localizeString('Pause'),
    value: 'pause',
  },
  {
    id: 6,
    className: styles.actionItem,
    name: localizeString('Submit'),
    value: 'submit',
  },
  {
    id: 7,
    className: styles.actionItem,
    name: localizeString('Withdraw'),
    value: 'withdraw',
  },
  {
    id: 8,
    className: styles.actionItem,
    name: localizeString('Send to review'),
    value: 'send_to_review',
  },
];

interface ICampaignActionsListProps {
  allowedActions: string[];
  className?: string;
  classNamesList?: {
    [name: string]: string,
  };
  history?: any;
  isHover: boolean;
  onSelect?: (target: IFormTarget) => void;
}

interface ICampaignActionsListState {
  isDisplayDropdownList: any;
}

class CampaignActionsList extends React.Component<ICampaignActionsListProps, ICampaignActionsListState> {
  public state = {
    isDisplayDropdownList: false,
  };

  public render() {
    const { allowedActions, classNamesList, isHover } = this.props;
    const { isDisplayDropdownList } = this.state;
    const actualActionsList = actionsList.filter(action => allowedActions.includes(action.value));

    let defaultAction: any = {};
    if (allowedActions.includes('copy')) {
      defaultAction = actualActionsList.filter(action => action.value === 'copy')[0];
    }
    if (allowedActions.includes('edit')) {
      defaultAction = actualActionsList.filter(action => action.value === 'edit')[0];
    }

    return (
      <div className={styles.campaignActionsList}>
        <TextLink
          className={styles.currentAction}
          onClick={() => this.handleSelect(defaultAction)}
          theme="violet">
          {defaultAction.name}
        </TextLink>
        <ControlIcon
          className={classNames(
            styles.control,
            (isHover || isDisplayDropdownList) && styles.isHover,
          )}
          onClick={this.handleClick}>
          <ThreeDotsIcon className={styles.icon} />
        </ControlIcon>
        <DropdownListItems
          alignment="right"
          autoWidth={true}
          isOpened={isDisplayDropdownList}
          onClickOutside={this.handleBlur}>
          {actualActionsList.map(action => (
            <DropdownListItem
              key={action.id}
              className={classNamesList && classNamesList.item}
              name={action.name || ''}
              onClick={this.handleSelect}
              value={action.value}>
              {action.name}
            </DropdownListItem>
          ))}
        </DropdownListItems>
      </div>
    );
  }

  private handleBlur = () => {
    this.setState({
      isDisplayDropdownList: false,
    });
  }

  private handleClick = () => {
    this.setState(state => ({
      isDisplayDropdownList: !state.isDisplayDropdownList,
    }));
  }

  private handleSelect = (target: IFormTarget) => {
    const { onSelect } = this.props;

    this.setState({
      isDisplayDropdownList: false,
    });

    if (onSelect) {
      onSelect(target);
    }
  }
}

export default CampaignActionsList;
