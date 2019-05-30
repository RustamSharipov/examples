import React from 'react';
import { formatMoney } from 'utils/text';
import styles from './style.css';

interface ICampaignMoneyRangeProps {
  value: number;
  maxValue?: number;
  currencyCode: string;
}

const CampaignMoneyRange: React.SFC<ICampaignMoneyRangeProps> = ({ value, maxValue, currencyCode }) => {
  let rangeWidth = '';

  if (maxValue && maxValue > 0) {
    const rangeFactor = value < maxValue ? value / maxValue : 1;
    rangeWidth = `${100 - 100 * rangeFactor}%`;
  }

  return (
    <div className={styles.campaignMoneyRange}>
      {maxValue
        ? (
          <React.Fragment>
            <div className={styles.value}>
              {formatMoney(maxValue, currencyCode)}
            </div>
            <div className={styles.range}>
              <span
                className={styles.rangeValue}
                style={{
                  width: rangeWidth,
                }} />
            </div>
          </React.Fragment>
        )
        : (
          <div className={styles.value}>
            {formatMoney(value, currencyCode)}
          </div>
        )
      }
    </div>
  );
};

export default CampaignMoneyRange;
