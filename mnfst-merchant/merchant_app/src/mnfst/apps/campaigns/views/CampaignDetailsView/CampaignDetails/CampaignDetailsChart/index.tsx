import React from 'react';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ButtonsSet from 'apps/ui/components/ButtonsSet';
import DateRangePicker from 'apps/ui/components/DateRangePicker';
import { FlexLayout, FlexLayoutChild } from 'apps/ui/components/FlexLayout';
import { LineChart } from 'apps/ui/components/Chart';
import Title from 'apps/ui/components/Title';
import { ICampaignActions, ICampaignStatisticGroupData } from 'apps/campaigns/interfaces/campaign';
import { COLORS } from 'constants/base';
import * as CampaignActions from 'apps/campaigns/actions/CampaignActions';
import { IFormTarget, IClassNames } from 'interfaces';
import styles from './style.css';

interface ICampaignDetailsChartProps {
  amount: number;
  campaignId: string;
  classNamesList?: IClassNames;
  data: ICampaignStatisticGroupData;
  labels: string[];
  placement: string;
  title?: string | null;
  type: string;
  CampaignActions: ICampaignActions;
}

class CampaignDetailsChart extends React.PureComponent<ICampaignDetailsChartProps> {
  public render() {
    const { classNamesList, labels, data, title } = this.props;
    const datasets = [
      {
        backgroundColor: '#ffffff',
        borderColor: COLORS.VIOLET,
        data: data.overall || [],
        fill: false,
        label: 'Overall',
      },
    ];

    if (data.facebook) {
      datasets.push({
        backgroundColor: '#ffffff',
        borderColor: COLORS.FACEBOOK,
        data: data.facebook,
        fill: false,
        label: 'Facebook',
      });
    }
    if (data.instagram) {
      datasets.push({
        backgroundColor: '#ffffff',
        borderColor: COLORS.INSTAGRAM,
        data: data.instagram,
        fill: false,
        label: 'Instagram',
      });
    }
    if (data.twitter) {
      datasets.push({
        backgroundColor: '#ffffff',
        borderColor: COLORS.TWITTER,
        data: data.twitter,
        fill: false,
        label: 'Twitter',
      });
    }

    const chartData = {
      datasets,
      labels: labels.map(label => moment(label, 'DD.MM.YYYY').format('D MMM YY')),
    };

    return (
      <div className={styles.chart}>
        <FlexLayout
          alignItems="center"
          justifyContent="space-between">
          {title && (
            <FlexLayoutChild>
              <Title level="2">
                {title}
              </Title>
            </FlexLayoutChild>
          )}
          <FlexLayoutChild>
            <FlexLayout alignItems="center">
              <ButtonsSet>
                <DateRangePicker
                  className={classNamesList && classNamesList.dateTimePicker}
                  dateFrom={moment().subtract(1, 'months').format()}
                  dateTo={moment().format()}
                  onSelect={this.handleDateRangeChange} />
              </ButtonsSet>
            </FlexLayout>
          </FlexLayoutChild>
        </FlexLayout>
        <LineChart data={chartData} />
      </div>
    );
  }

  private handleDateRangeChange = (target: IFormTarget) => {
    const [dateFrom, dateTo] = target.value;
    const { campaignId: id, placement, type } = this.props;

    this.props.CampaignActions.updateStatistic({
      id,
      dateFrom,
      dateTo,
      placement,
      type,
    });
  }
}

function mapDispatchToProps(dispatch) {
  return {
    CampaignActions: bindActionCreators(CampaignActions, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(CampaignDetailsChart);
