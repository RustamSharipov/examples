import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

const alignItemsClassNames = {
  baseline: styles.baselineAlignment,
  center: styles.centerAlignment,
  'flex-end': styles.flexEndAlignment,
  'flex-start': styles.flexStartAlignment,
  stretch: styles.stretchAlignment,
};

const justifyContentClassNames = {
  center: styles.centerJustification,
  'flex-end': styles.flexEndJustification,
  'flex-start': styles.flexStartJustification,
  'space-around': styles.spaceAroundJustification,
  'space-between': styles.spaceBetweenJustification,
  'space-evenly': styles.spaceEvenlyJustification,
  stretch: styles.stretchJustification,
};

const directionClassNames = {
  column: styles.columnDirection,
  'column-reverse': styles.columnReverseDirection,
  row: styles.rowDirection,
  'row-reverse': styles.rowReverseDirection,
};

const maxColsSet = {
  xsmall: 4,
  small: 8,
  medium: 12,
  large: 12,
  xlarge: 12,
};

interface IBreakpoints {
  xsmall?: number;
  small?: number;
  medium?: number;
  large?: number;
  xlarge?: number;
}

interface IFlexLayoutProps {
  alignItems?: string;
  children: React.ReactNode;
  className?: string;
  direction?: string;
  grow?: number;
  justifyContent?: string;
  withGrid?: boolean;
  withWrap?: boolean;
}

interface IFlexLayoutChildProps {
  children: React.ReactNode;
  className?: string;
  cols?: number;
  colsSet?: IBreakpoints;
  grow?: number;
  order?: number | undefined;
}

export const FlexLayout: React.SFC<IFlexLayoutProps> = (props) => {
  const { alignItems, children, className, direction, grow, justifyContent, withGrid, withWrap } = props;
  const alignItemsClassName = alignItems && alignItemsClassNames[alignItems];
  const directionClassName = direction && directionClassNames[direction];
  const justifyContentClassName = justifyContent && justifyContentClassNames[justifyContent];
  const style = {
    flexGrow: grow,
  };

  return (
    <div
      className={classNames(
        styles.flexLayout,
        className,
        alignItemsClassName,
        directionClassName,
        justifyContentClassName,
        withGrid && styles.withGrid,
        withWrap && styles.withWrap,
      )}
      style={style}>
      {children}
    </div>
  );
};

export const FlexLayoutChild: React.SFC<IFlexLayoutChildProps> = (props) => {
  const { children, className, colsSet, grow, order } = props;
  const childOrderStyles = {
    order,
    flexGrow: grow,
  };
  const getColsStyles = (size: string, count: number) => {
    const maxCount = maxColsSet[size] || maxColsSet.xsmall;
    return classNames(
      styles[`cols${maxCount}`],
      styles[`cols${maxCount}-${count}`],
    );
  };

  const colsSetClassName = colsSet && Object.entries(colsSet).map(([key, value]) => getColsStyles(key, value));
  const colsClassNames = classNames(
    styles.column,
    colsSetClassName,
  );

  return (
    <div
      className={classNames(
        colsSet && colsClassNames,
        className,
      )}
      style={childOrderStyles}>
      {children}
    </div>
  );
};
