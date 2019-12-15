import React from 'react';
import propTypes from 'prop-types';

import { Wrapper } from './styles';

export default function AuthLayout({ children }) {
  return <Wrapper>{children}</Wrapper>;
}

AuthLayout.propTypes = {
  children: propTypes.element.isRequired,
};
