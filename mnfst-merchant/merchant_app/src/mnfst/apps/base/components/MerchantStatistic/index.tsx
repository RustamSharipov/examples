import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { StatisticItem, StatisticItemTitle, StatisticItemValue } from 'apps/ui/components/Statistic';
import { formatMoney } from 'utils/text';
import { localizeString } from 'utils/localization';
import { IStatisticActions, IStatisticReducer } from 'apps/base/interfaces/statistic';
import * as StatisticActions from 'apps/base/actions/StatisticActions';
import styles from './style.css';

const hideStatistic = true;

interface IMerchantStatisticProps {
  statistic: IStatisticReducer;
  StatisticActions: IStatisticActions;
}

class MerchantStatistic extends React.Component<IMerchantStatisticProps> {
  public componentDidMount() {
    this.props.StatisticActions.fetchData();
  }

  public render() {
    const { statistic } = this.props.statistic;
    if (statistic && !hideStatistic) {
      return (
        <div className={styles.merchantStatistic}>
          {statistic.credit && (
            <StatisticItem>
              <StatisticItemTitle>
                {localizeString('Credit limit')}
              </StatisticItemTitle>
              <StatisticItemValue>
                {formatMoney(statistic.credit.value, statistic.credit.currency_code)}
              </StatisticItemValue>
            </StatisticItem>
          )}
          {statistic.reserved && (
            <StatisticItem>
              <StatisticItemTitle>
                {localizeString('Hold')}
              </StatisticItemTitle>
              <StatisticItemValue>
                {formatMoney(statistic.reserved.value, statistic.reserved.currency_code)}
              </StatisticItemValue>
            </StatisticItem>
          )}
          {statistic.balance && (
            <StatisticItem>
              <StatisticItemTitle>
                {localizeString('Balance')}
              </StatisticItemTitle>
              <StatisticItemValue isTotal={true}>
                {formatMoney(statistic.balance.value, statistic.balance.currency_code)}
              </StatisticItemValue>
            </StatisticItem>
          )}
        </div>
      );
    }

    return null;
  }
}

function mapStateToProps(state) {
  return {
    statistic: state.statistic,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    StatisticActions: bindActionCreators(StatisticActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantStatistic);
