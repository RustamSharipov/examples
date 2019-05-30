import React from 'react';
import classNames from 'classnames';
import { Line } from 'react-chartjs-2';
import CheckIcon from 'apps/ui/components/icons/CheckIcon';
import styles from './style.css';

interface ITooltipItem {
  color: string;
  name: string;
  value: string;
  date: string;
}

interface ITooltip {
  items: ITooltipItem[];
  left: number;
  top: number;
}

interface IChartProps {
  className?: string;
  data: any;
  options?: any;
}

interface IChartState {
  isDisplayCanvasTools?: boolean;
  legendItems: any[];
  rulerLeftOffset: number;
  tooltipItems: ITooltipItem[];
  tooltipLeftOffset: number;
}

const TooltipItem: React.SFC<ITooltipItem> = (props) => {
  const { color, name, value } = props;
  const tooltipItemStyle = { color };

  return (
    <div className={styles.tooltipItem}>
      <div className={styles.tooltipItemName}>
        {name}
      </div>
      <div
        className={styles.tooltipItemValue}
        style={tooltipItemStyle}>
        {value}
      </div>
    </div>
  );
};

export class LineChart extends React.Component<IChartProps, IChartState> {
  public chart: any;
  public container: any;
  public tooltip: any;

  constructor(props) {
    super(props);
    const legendItems = props.data.datasets.map((item, index) => ({
      id: index,
      color: item.borderColor,
      isChecked: true,
      name: item.label,
      value: item.data,
    })) || [];

    this.state = {
      legendItems,
      isDisplayCanvasTools: false,
      rulerLeftOffset: 0,
      tooltipItems: [],
      tooltipLeftOffset: 0,
    };
  }

  public render() {
    const { className, data } = this.props;
    const { isDisplayCanvasTools, legendItems, rulerLeftOffset, tooltipItems, tooltipLeftOffset } = this.state;

    const tooltipStyle = {
      left: tooltipLeftOffset,
    };

    const chartRulerStyle = {
      left: rulerLeftOffset,
    };

    const chartOptions = {
      elements: {
        line: {
          borderWidth: 2,
        },
        point: {
          borderWidth: 2,
        },
      },
      maintainAspectRatio: false,
      legend: false,
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
          },
        }],
      },
      tooltips: {
        custom: (tooltipModel) => {
          const items = tooltipModel.body
            .map((item, index) => {
              const color = tooltipModel.labelColors[index].borderColor;
              const date = tooltipModel.dataPoints[index].xLabel;
              const [name] = item.lines[0].split(': ');
              const value = tooltipModel.dataPoints[index].yLabel;

              return {
                color,
                date,
                name,
                value,
              };
            });

          // set position of tooltip
          const position = this.chart.chartInstance.canvas.getBoundingClientRect();
          const top = this.container.clientHeight / 2 - this.tooltip.clientHeight / 2;
          const left = position.left + tooltipModel.caretX - this.container.offsetLeft + 20;

          this.updateTooltip({ items, left, top });
        },
        enabled: false,
        interest: false,
        intersect: false,
        mode: 'x',
        position: 'average',
      },
    };

    const filteredData = {
      ...data,
      datasets: data.datasets.filter((item, index) => legendItems[index].isChecked),
    };

    return (
      <div
        ref={(element) => { this.container = element; }}
        className={classNames(
          styles.chart,
          className,
        )}>
        <div
          className={styles.canvasContent}
          onMouseLeave={this.handleChartMouseLeave}
          onMouseMove={this.handleChartMouseMove}>
          <Line
            ref={(element) => { this.chart = element; }}
            data={filteredData}
            options={chartOptions} />
          {isDisplayCanvasTools && (
            <span
              className={styles.ruler}
              style={chartRulerStyle} />
          )}
        </div>
        {legendItems && (
          <button className={styles.legend}>
            {legendItems.map((item) => {
              const legendItemStyle = {
                color: item.color,
              };
              return (
                <div
                  key={item.id}
                  className={styles.legendItem}
                  onClick={() => this.toggleLegendItem(item.id)}
                  style={legendItemStyle}>
                  <span className={styles.legendItemControl}>
                    {item.isChecked && (
                      <CheckIcon className={styles.legendItemControlIcon} />
                    )}
                  </span>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </button>
        )}
        <div
          ref={(element) => { this.tooltip = element; }}
          className={classNames(
            styles.tooltip,
            isDisplayCanvasTools && styles.isDisplay,
          )}
          style={tooltipStyle}>
          <span
            className={styles.tooltipDate}>
            {tooltipItems.length && tooltipItems[0].date}
          </span>
          {tooltipItems.map((item, index) => (
            <TooltipItem
              key={index}
              {...item} />
          ))}
        </div>
      </div>
    );
  }

  private toggleLegendItem = (id: any) => {
    const { legendItems } = this.state;
    legendItems[id].isChecked = !legendItems[id].isChecked;
    this.setState({ legendItems });
  }

  private handleChartMouseLeave = () => {
    this.setState({
      isDisplayCanvasTools: false,
      tooltipItems: [],
    });
  }

  private handleChartMouseMove = () => {
    const { tooltipItems, tooltipLeftOffset } = this.state;

    this.setState({
      isDisplayCanvasTools: tooltipItems.length > 0,
      rulerLeftOffset: tooltipLeftOffset - 20,
    });
  }

  private updateTooltip = (props: ITooltip) => {
    const {
      items: tooltipItems,
      left: tooltipLeftOffset,
    } = props;

    this.setState({
      tooltipItems,
      tooltipLeftOffset,
    });
  }
}
