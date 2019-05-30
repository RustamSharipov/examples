import React from 'react';
import classNames from 'classnames';
import styles from './style.css';

interface IFileTypesProps {
  icon: React.ReactNode;
  name: string;
}

interface IFileTypesIconProps {
  fileType: string;
}

const FileTypesIcon: React.SFC<IFileTypesIconProps> = (props) => {
  const { fileType } = props;
  return (
    <span className={classNames(
      styles.fileTypeIcon,
      styles[fileType],
    )} />
  );
};

class FileTypes {
  public static psd: IFileTypesProps = {
    icon: <FileTypesIcon fileType="psd" />,
    name: 'Photoshop',
  };

  public static sketch: IFileTypesProps = {
    icon: <FileTypesIcon fileType="sketch" />,
    name: 'Sketch',
  };
}

export default FileTypes;
