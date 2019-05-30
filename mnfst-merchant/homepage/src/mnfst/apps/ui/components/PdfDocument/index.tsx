import React from 'react';
import './style.css';

interface IPdfDocumentProps {
  src?: string;
}

class PdfDocument extends React.PureComponent<IPdfDocumentProps> {
  public componentDidMount() {
    const { src } = this.props;

    document.body.classList.add('pdfDocuments');

    if (src) {
      window.location.href = src;
    }
  }

  public componentDidUpdate() {
    const { src } = this.props;

    if (src) {
      window.location.href = src;
    }
  }

  public componentWillUnmount() {
    document.body.classList.remove('pdfDocuments');
  }

  public render() {
    return null;
  }
}

export default PdfDocument;
