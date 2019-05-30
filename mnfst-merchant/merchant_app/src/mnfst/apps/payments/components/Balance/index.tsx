import React from 'react';
import classNames from 'classnames';
import { TextStub } from 'apps/ui/components/Text';
import { IMoney } from 'apps/campaigns/interfaces/campaign';
import { formatMoney } from 'utils/text';
import styles from './style.css';

interface IBalanceProps {
  className?: string;
  value: IMoney | null;
}

const Balance: React.SFC<IBalanceProps> = (props) => {
  const { className, value } = props;
  return (
    <div className={classNames(
      styles.balance,
      className,
    )}>
      <div className={styles.value}>
        {value && formatMoney(value.value, value.currency_code)}
      </div>
    </div>
  );
};

export default Balance;

export const BalanceStub = () => {
  return (
    <div className={styles.balance}>
      <div className={styles.caption}>
        <TextStub />
      </div>
      <div className={styles.value}>
        <div className={styles.valueTextStub} />
      </div>
    </div>
  );
};
