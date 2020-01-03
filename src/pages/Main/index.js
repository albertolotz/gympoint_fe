import React from 'react';
import img from '~/assets/img.jpg';
import { Container } from './styles';

export default function Main() {
  return (
    <>
      <Container>
        <img src={img} alt="" />
      </Container>
    </>
  );
}
