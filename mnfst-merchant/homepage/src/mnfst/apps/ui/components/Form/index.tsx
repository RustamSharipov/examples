import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IFormProps {
  children: React.ReactNode;
  className?: string;
  encType?: string;
  method?: string;
  onError?: (errorList: []) => void;
  onSubmit?: (method?: string) => void;
}

interface IFormControlsProps {
  children: React.ReactNode;
  className?: string;
}

interface IFormRowsGroupProps {
  caption?: string;
  children: React.ReactNode;
  className?: string;
}

interface IFormRowProps {
  className?: string;
  children: React.ReactNode;
  type?: string;
}

interface IFormRowSectionProps {
  align?: string;
  children: React.ReactNode;
  className?: string;
  part?: string;
}

export class Form extends React.Component<IFormProps> {
  public render() {
    const { children, className, encType } = this.props;

    return (
      <form
        className={className}
        encType={encType}
        onSubmit={this.handleSubmit}>
        {children}
      </form>
    );
  }

  private handleSubmit = (event: any) => {
    event.preventDefault();
    const { method, onSubmit } = this.props;
    if (onSubmit) {
      onSubmit(method);
    }
  }
}

export const FormRowsGroup: React.SFC<IFormRowsGroupProps> = (props) => {
  const { caption, children, className } = props;

  return (
    <div className={classNames(
      styles.formRowsGroup,
      className,
    )}>
      {caption && (
        <div className={styles.formRowsGroupCaption}>
          {caption}
        </div>
      )}
      {children}
    </div>
  );
};

export const FormRow: React.SFC<IFormRowProps> = (props) => {
  const { children, className, type } = props;

  return (
    <div className={classNames(
      styles.formRow,
      type && styles[`${type}Type`],
      className,
    )}>
      {children}
    </div>
  );
};

const partsClassNames = {
  half: styles.half,
  'one-third': styles.oneThird,
  'two-thirds': styles.twoThirds,
  'one-fourth': styles.oneFourth,
  'three-fourth': styles.threeFourth,
};

const alignmentClassNames = {
  center: styles.centerAlignment,
  start: styles.flexStartAlignment,
  end: styles.flexEndAlignment,
  stretch: styles.stretchAlignment,
};

export const FormRowSection: React.SFC<IFormRowSectionProps> = (props) => {
  const { align, children, className, part } = props;
  const partsClassName = part ? [styles.formRowSectionPart, partsClassNames[part]] : null;
  const alignmentClassName = align ? alignmentClassNames[align] : null;

  return (
    <div className={classNames(
      styles.formRowSection,
      partsClassName,
      alignmentClassName,
      className,
    )}>
      {children}
    </div>
  );
};

export const FormControls: React.SFC<IFormControlsProps> = (props) => {
  const { children, className } = props;

  return (
    <div className={classNames(
      styles.formControls,
      className,
    )}>
      {children}
    </div>
  );
};
