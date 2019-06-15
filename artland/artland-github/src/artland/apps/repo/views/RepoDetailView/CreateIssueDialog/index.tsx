import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter } from 'apps/base/components/Dialog';
import TextField from 'apps/base/components/TextField';
import styles from './style.css';
import Button from 'apps/base/components/Button';

interface IFormField<T> {
  name: string;
  value: T;
}

interface ICreateIssueForm {
  description: IFormField<string>;
  title: IFormField<string>;
}

interface ICreateIssueDialogProps {
  onIssueCreate: ({ description, title }) => void;
  onCancel: () => void;
}

interface  ICreateIssueDialogState {
  form: ICreateIssueForm;
}

export default class CreateIssueDialog extends React.Component<ICreateIssueDialogProps, ICreateIssueDialogState> {
  public state = {
    form: {
      description: {
        name: 'description',
        value: '',
      },
      title: {
        name: 'title',
        value: '',
      },
    },
  };

  public render() {
    const { form } = this.state;

    return (
      <Dialog className={styles.createIssueDialog}>
        <DialogHeader>
          Create New Issue
        </DialogHeader>
        <DialogContent>
          <div className={styles.createIssueDialogFormRow}>
            <TextField
              autoFocus={true}
              onChange={this.handleFormFieldChange}
              onKeyPress={this.handleEnterPress}
              name={form.title.name}
              placeholder="Title"
              value={form.title.value} />
          </div>
          <div className={styles.createIssueDialogFormRow}>
            <TextField
              isTextArea={true}
              onChange={this.handleFormFieldChange}
              onKeyPress={this.handleEnterPress}
              name={form.description.name}
              placeholder="Description"
              rows={5}
              value={form.description.value} />
          </div>
        </DialogContent>
        <DialogFooter>
          <div className={styles.createIssueDialogControls}>
            <Button
              className={styles.createIssueDialogControl}
              onClick={this.handleCreateButtonCancel}
              theme="red">
              Cancel
            </Button>
            <Button
              className={styles.createIssueDialogControl}
              disabled={form.title.value.length === 0}
              onClick={this.createButtonClick}
              theme="green">
              Create
            </Button>
          </div>
        </DialogFooter>
      </Dialog>
    );
  }

  private handleFormFieldChange = ({ name, value }) => {
    this.setState(state => ({
      form: {
        ...state.form,
        [name]: {
          ...state.form[name],
          value,
        },
      },
    }));
  }

  private handleCreateButtonCancel = () => {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }
  }

  private createButtonClick = () => {
    const { onIssueCreate } = this.props;
    const {
      description: {
        value: description,
      },
      title: {
        value: title,
      }
    } = this.state.form;

    if (onIssueCreate) {
      onIssueCreate({ description, title });
    }
  }

  private handleEnterPress = (event) => {
    if (this.state.form.title.value.length > 0 && event.key === 'Enter') {
      this.createButtonClick();
    }
  }
}
