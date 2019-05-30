import React from 'react';
import classNames from 'classnames';
import { IFormTarget } from 'interfaces';
import styles from './style.css';

interface IFilesData {
  [name: string]: number;
}

interface IFileUploadProps {
  accept?: string;
  className?: string;
  disabled?: boolean;
  filesData?: IFilesData;
  maxFileSize?: number;
  name?: string;
  onRef?: (element: any) => void;
  onAttach?: (formTarget: IFormTarget) => void;
  onInvalidFileSize?: () => void;
  onInvalidFileType?: () => void;
}

class FileUpload extends React.Component<IFileUploadProps> {
  public render() {
    const { accept, className, disabled, name } = this.props;
    return (
      <span className={classNames(
        styles.fileUpload,
        className,
      )}>
        <input
          ref={this.handleRef}
          accept={accept}
          className={styles.input}
          disabled={disabled}
          name={name}
          onChange={this.handleChange}
          type="file" />
      </span>
    );
  }

  private handleRef = (node: HTMLInputElement) => {
    const { name, onRef } = this.props;
    if (onRef) {
      onRef({
        name,
        children: {
          input: node,
        },
      });
    }
  }

  private handleChange = (event: any) => {
    const { accept, maxFileSize, onAttach, onInvalidFileSize, onInvalidFileType } = this.props;
    const { name } = event.target;
    const file = event.target.files[0];
    const acceptTypes = accept ? accept.split(/,\s*/) : [];

    if (file) {
      const isValidFileType = acceptTypes.indexOf(file.type) !== -1;
      const isValidaFileSize = !maxFileSize || file.size <= maxFileSize;

      // Attach file with valid extension and size
      if (isValidFileType && isValidaFileSize) {
        // Multipart
        const formData = new FormData();
        formData.append('asset[file]', file, file.name);

        // Base64
        const reader = new FileReader();
        let data;

        reader.addEventListener('load', () => {
          data = reader.result;

          if (onAttach) {
            onAttach({
              name,
              value: {
                formData,
                base64: data,
                fileName: file.name,
                fileSize: file.size,
                fileType: file.type,
                lastModified: file.lastModified,
                lastModifiedDate: file.lastModifiedDate,
              },
            });
          }
        });

        reader.readAsDataURL(file);
      }

      // File extension error
      else if (!isValidFileType) {
        if (onInvalidFileType) {
          onInvalidFileType();
        }
      }

      // File size error
      else if (!isValidaFileSize) {
        if (onInvalidFileSize) {
          onInvalidFileSize();
        }
      }
    }
  }
}

export default FileUpload;
