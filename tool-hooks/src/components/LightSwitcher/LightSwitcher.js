import React from 'react';
import PropTypes from 'prop-types';

import { Switcher } from 'components';

import { ReactComponent as CloudIcon } from './assets/cloudy.svg';
import { ReactComponent as IndoorIcon } from './assets/indoor.svg';
import { ReactComponent as SunIcon } from './assets/sunny.svg';

const LightSwitcher = ({ className, onChange, value, size }) => {
  return (
    <Switcher
      className={className}
      items={[
        {
          label: <SunIcon />,
          value: 'sunny'
        },
        {
          label: <CloudIcon />,
          value: 'cloudy'
        },
        {
          label: <IndoorIcon />,
          value: 'indoor'
        },
      ]}
      onChange={(value) => onChange(value)}
      size={size}
      value={value}
    />
  );
};

LightSwitcher.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOf(['sunny', 'cloudy', 'indoor']),
};

export default LightSwitcher;
