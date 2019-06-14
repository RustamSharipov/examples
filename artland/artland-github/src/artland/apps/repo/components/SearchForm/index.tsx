import React from 'react';
import TextField from 'apps/base/components/TextField';
import Button from 'apps/base/components/Button';
import styles from './style.css';

interface IFormField {
  name: string;
  value: string;
}

interface ISearchFormProps {
  history: any;
  onChange: ({ queryString: string }) => void;
}

interface ISearchFormState {
  queryString: string;
}

export default class SearchForm extends React.Component<ISearchFormProps, ISearchFormState> {
  public state = {
    queryString: '',
  };

  public render() {
    const { queryString } = this.state;

    return (
      <div className={styles.searchForm}>
        <TextField
          dockTo="right"
          name="search"
          onChange={this.handleFormFieldChange}
          onKeyPress={this.handleEnterPress}
          placeholder="Search users..."
          value={queryString} />
        <Button
          className={styles.button}
          disabled={queryString.length === 0}
          dockTo="left"
          onClick={this.submitForm}>
          Search
        </Button>
      </div>
    );
  }

  private handleFormFieldChange = (formField: IFormField) => {
    const { value: queryString } = formField;
    this.setState({ queryString });
  }

  private handleEnterPress = (event) => {
    if (this.state.queryString.length > 0 && event.key === 'Enter') {
      this.submitForm();
    }
  }

  private submitForm = () => {
    const { history, onChange } = this.props;
    const { queryString } = this.state;

    if (history.location !== '/') {
      history.push('/');
    }

    if (onChange) {
      onChange({ queryString });
    }
  }
};
