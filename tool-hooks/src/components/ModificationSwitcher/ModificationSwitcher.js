import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import { Switcher } from 'components';

const ModificationSwitcher = ({ className, onChange, value, size, t }) => {
  return (
    <Switcher
      className={className}
      items={[
        {
          label: t('Product.DSLR'),
          value: 'dslr'
        },
        {
          label: t('Product.Mirrorless'),
          value: 'mirrorless'
        },
      ]}
      onChange={(value) => onChange(value)}
      size={size}
      value={value}
    />
  );
};

ModificationSwitcher.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOf(['dslr', 'mirrorless']),
  t: PropTypes.func,
};

export default withTranslation()(ModificationSwitcher);
