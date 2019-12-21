import React from 'react';
import propTypes from 'prop-types';
import Header from '~/components/header';

import { Wrapper } from './styles';

export default function DefautLayout({ children }) {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
}

DefautLayout.propTypes = {
  children: propTypes.element.isRequired,
};
