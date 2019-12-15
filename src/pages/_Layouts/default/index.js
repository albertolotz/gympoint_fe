import React from 'react';
import propTypes from 'prop-types';

import { Wrapper } from './styles';

export default function DefautLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

DefautLayout.propTypes = {
  children: propTypes.element.isRequired,
};
