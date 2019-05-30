import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface ITable {
  children?: React.ReactNode;
  className?: string | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: any;
}

interface ITableHead {
  children?: React.ReactNode;
  className?: string | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: any;
}

interface ITableBody {
  children?: React.ReactNode;
  className?: string | null;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: any;
}

interface ITableRowProps {
  children?: React.ReactNode;
  className?: string | null;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  style?: any;
}

interface ITableCell {
  children?: React.ReactNode;
  className?: string | null;
  colSpan?: number;
  rowSpan?: number;
}

export const Table: React.SFC<ITable> = (props) => {
  const { children, className } = props;
  return (
    <table className={classNames(
      styles.table,
      className && className,
    )}>
      {children}
    </table>
  );
};

export const TableHead: React.SFC<ITableHead> = (props) => {
  const { children, className } = props;
  return (
    <thead className={classNames(
      styles.head,
      className && className,
    )}>
      <tr>
        {children}
      </tr>
    </thead>
  );
};

export const TableHeadCell: React.SFC<ITableCell> = (props) => {
  const { children, className, colSpan, rowSpan } = props;
  return (
    <th
      className={classNames(
        styles.headCell,
        className && className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}>
      {children}
    </th>
  );
};

export const TableBody: React.SFC<ITableBody> = (props) => {
  const { children, className } = props;
  return (
    <tbody className={classNames(
      styles.body,
      className && className,
    )}>
      {children}
    </tbody>
  );
};

export const TableBodyCell: React.SFC<ITableCell> = (props) => {
  const { children, className, colSpan, rowSpan } = props;
  return (
    <td
      className={classNames(
        styles.bodyCell,
        className && className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}>
      {children}
    </td>
  );
};

export const TableRow: React.SFC<ITableRowProps> = (props) => {
  const { children, className, style, onClick, onMouseEnter, onMouseLeave } = props;
  return (
    <tr
      className={classNames(
        styles.row,
        className && className,
      )}
      onClick={onClick && onClick}
      onMouseEnter={onMouseEnter && onMouseEnter}
      onMouseLeave={onMouseLeave && onMouseLeave}
      style={style}>
      {children}
    </tr>
  );
};

export const TableGroupCaption: React.SFC<ITableCell> = (props) => {
  const { children, className, colSpan, rowSpan } = props;
  return (
    <td className={classNames(
        styles.groupCaption,
        className && className,
      )}
      colSpan={colSpan}
      rowSpan={rowSpan}>
      {children}
    </td>
  );
};
