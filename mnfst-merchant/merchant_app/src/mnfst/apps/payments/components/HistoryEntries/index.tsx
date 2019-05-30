import React from 'react';
import classNames from 'classnames';
import { Table, TableHead, TableHeadCell, TableBody, TableRow, TableBodyCell } from 'apps/ui/components/Table';
import styles from './style.css';

interface IHistoryEntriesProps {
  children: React.ReactNode;
  className?: string;
}

interface IHistoryEntriesHeadProps {
  children: React.ReactNode;
  className?: string;
}

interface IHistoryEntriesHeadCellProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

interface IHistoryEntriesBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface IHistoryEntriesRowProps {
  children: React.ReactNode;
  className?: string;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onClick?: () => void;
  style?: any;
}

interface IHistoryEntriesBodyCellProps {
  children?: React.ReactNode;
  className?: string;
  colSpan?: number;
  rowSpan?: number;
}

interface IHistoryEntryDetailsProps {
  children?: React.ReactNode;
  className?: string;
}

interface IHistoryEntryDetailsItemProps {
  children?: React.ReactNode;
  className?: string;
}

export const HistoryEntries: React.SFC<IHistoryEntriesProps> = (props) => {
  const { children } = props;
  return (
    <Table className={styles.historyEntries}>
      {children}
    </Table>
  );
};

export const HistoryEntriesHead: React.SFC<IHistoryEntriesHeadProps> = (props) => {
  const { children, className } = props;
  return (
    <TableHead className={className}>
      {children}
    </TableHead>
  );
};

export const HistoryEntriesHeadCell: React.SFC<IHistoryEntriesHeadCellProps> = (props) => {
  const { children, className, colSpan, rowSpan } = props;
  return (
    <TableHeadCell
      className={classNames(
        styles.historyEntriesHeadCell,
        className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}>
      {children}
    </TableHeadCell>
  );
};

export const HistoryEntriesBody: React.SFC<IHistoryEntriesBodyProps> = (props) => {
  const { children, className } = props;
  return (
    <TableBody className={className}>
      {children}
    </TableBody>
  );
};

export const HistoryEntriesRow: React.SFC<IHistoryEntriesRowProps> = (props) => {
  const { children, className, isExpandable, isExpanded, style, onClick } = props;
  return (
    <TableRow
      className={classNames(
        isExpandable && styles.expandableHistoryEntriesRow,
        isExpanded && styles.isExpanded,
        className,
      )}
      onClick={onClick && onClick}
      style={style}>
      {children}
    </TableRow>
  );
};

export const HistoryEntriesBodyCell: React.SFC<IHistoryEntriesBodyCellProps> = (props) => {
  const { children, className, colSpan, rowSpan } = props;
  return (
    <TableBodyCell
      className={classNames(
        styles.historyEntriesBodyCell,
        className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}>
      {children}
    </TableBodyCell>
  );
};

export const HistoryEntryDetails: React.SFC<IHistoryEntryDetailsProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.historyEntryDetails,
      className,
    )}>
      {children}
    </div>
  );
};

export const HistoryEntryDetailsItem: React.SFC<IHistoryEntryDetailsItemProps> = (props) => {
  const { children, className } = props;
  return (
    <div className={classNames(
      styles.historyEntryDetailsItem,
      className,
    )}>
      {children}
    </div>
  );
};
