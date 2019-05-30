import React from 'react';
import classNames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { IClassNames } from 'interfaces';
import styles from './style.css';

interface IPageNavigationProps {
  className?: string;
  classNamesList?: IClassNames;
  currentPage: number;
  history: any;
  onPageChange: (props: any) => void;
  totalPages: number;
}

interface IPageNavigationPage {
  link: string;
  number: number;
}

class PageNavigation extends React.Component<IPageNavigationProps> {
  public render() {
    const { className, classNamesList, totalPages } = this.props;
    const currentPage: number = this.props.currentPage || 1;
    const pages: IPageNavigationPage[] = Array(totalPages).fill(1).map((_, index) => ({
      link: `?page=${index + 1}`,
      number: index + 1,
    }));

    if (totalPages && totalPages > 1) {
      return (
        <div className={classNames(
          styles.pageNavigation,
          className,
        )}>
          {currentPage > 1 && (
            <Link
              className={classNames(
                styles.button,
                currentPage === 1 && styles.isDisabled,
                classNamesList && classNamesList.prevLink,
              )}
              onClick={() => this.handlePageChange(currentPage - 1)}
              to={this.getTargetPageLink(currentPage - 1)}>
              {'<'}
            </Link>
          )}
          <div className={classNames(
            styles.items,
            classNamesList && classNamesList.items,
          )}>
            {pages.map(page => currentPage === page.number
              ? (
                <button
                  key={page.number}
                  className={classNames(
                    styles.button,
                    styles.isActive,
                    classNamesList && classNamesList.item,
                  )}
                  type="button">
                  {page.number}
                </button>
              )
              : (
                  <Link
                    key={page.number}
                    className={classNames(
                      styles.button,
                      currentPage === page.number && styles.isActive,
                      classNamesList && classNamesList.item,
                    )}
                    onClick={() => this.handlePageChange(page.number)}
                    to={this.getTargetPageLink(page.number)}>
                    {page.number}
                  </Link>
                ),
            )}
          </div>
          {currentPage !== totalPages && (
            <Link
              className={classNames(
                styles.button,
                (currentPage === totalPages) && styles.isDisabled,
                classNamesList && classNamesList.nextLink,
              )}
              onClick={() => this.handlePageChange(currentPage + 1)}
              to={this.getTargetPageLink(currentPage + 1)}>
              {'>'}
            </Link>
          )}
        </div>
      );
    }

    return null;
  }

  private getTargetPageLink = (pageNumber: number) => {
    const { history } = this.props;
    const qs = { ...queryString.parse(history.location.search) };
    qs.page = String(pageNumber);

    return `${history.location.pathname}?${queryString.stringify(qs)}`;
  }

  private handlePageChange = (pageNumber: number) => {
    const { onPageChange } = this.props;

    if (onPageChange) {
      onPageChange({ pageNumber });
    }
  }
}

export default withRouter(PageNavigation);
