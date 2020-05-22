import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { Title, Description } from '.';

import { ChildrenPropType } from 'types';

const Wrapper = styled.div`
  :not(:first-child) {
    margin-top: 4rem;
  }

  :not(:last-child) {
    margin-bottom: 4rem;
  }

  @media (min-width: 768px) {
    :not(:first-child) {
      margin-top: 8rem;
    }
  
    :not(:last-child) {
      margin-bottom: 8rem;
    }
  }
`;

const Section = ({ className, children }) => {
  return (
    <Wrapper className={className}>
      {children}
    </Wrapper>
  );
};

Section.Title = Title;

Section.Description = Description;

Section.propTypes = {
  className: PropTypes.string,
  children: ChildrenPropType.isRequired,
};

export default Section;
