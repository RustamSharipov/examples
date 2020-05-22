import PropTypes from 'prop-types';

export const ChildrenPropType = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.arrayOf(PropTypes.element),
  PropTypes.string,
  PropTypes.number,
  PropTypes.node,
  PropTypes.element
]);
