import React from 'react';
import classNames from 'classnames';
import LinkIcon from 'apps/ui/components/icons/LinkIcon';
import TextLink from 'apps/ui/components/TextLink';
import { TextStub } from 'apps/ui/components/Text';
import styles from './style.css';
import request from 'utils/request';

interface IInvoiceLinkProps {
  caption: string;
  className?: string;
  onClick?: ({ url: string }) => void;
  target?: string;
  type: 'application/pdf' | 'application/zip';
  url: string;
}

interface IInvoiceLinkState {
  url: string | null;
}

class InvoiceLink extends React.PureComponent<IInvoiceLinkProps, IInvoiceLinkState> {
  public state = {
    url: null,
  };

  public componentDidMount() {
    const { type, url } = this.props;

    if (type === 'application/pdf') {
      this.setState({
        url,
      });
    }

    if (type === 'application/zip') {
      fetchInvoice(url)
        .then(({ data }) => {
          const blob = new Blob([data], { type });
          const invoiceUrl = window.URL.createObjectURL(blob);

          this.setState({
            url: invoiceUrl,
          });
        });
    }
  }

  public render() {
    const { caption, className, target } = this.props;
    const { url } = this.state;

    if (url) {
      return (
        <TextLink
          className={classNames(
            styles.invoiceLink,
            className,
          )}
          href={url}
          target={target}
          theme="violet">
          <LinkIcon className={styles.icon} />
          <div className={styles.caption}>
            {caption}
          </div>
        </TextLink>
      );
    }

    return null;
  }
}

export default InvoiceLink;

export const InvoiceLinkStub = () => {
  return (
    <div className={styles.invoiceLink}>
      <div className={styles.caption}>
        <TextStub />
      </div>
    </div>
  );
};

async function fetchInvoice(url: string) {
  return await request(
    {
      url,
      method: 'GET',
      responseType: 'blob',
    },
    {
      absoluteUri: true,
    },
  );
}
