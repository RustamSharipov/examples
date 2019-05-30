import React from 'react';
import './style.css';

interface IRangeInputProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: string;
  onChange?: (event: any) => void;
}

class RangeInput extends React.PureComponent<IRangeInputProps> {
  public render() {
    return <input type="range" {...this.props} />;
  }
}

export default RangeInput;
