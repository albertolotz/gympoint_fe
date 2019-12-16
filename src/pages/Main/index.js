import React from 'react';
import api from '~/services/api';

// import { Container } from './styles';

export default function Main() {
  api.get('plans');
  return <h1>Pagina incial</h1>;
}
