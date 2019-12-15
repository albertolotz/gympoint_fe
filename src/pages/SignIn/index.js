import React from 'react';
import logo from '~/assets/logo.png';

import { Container } from './styles';

export default function SignIn() {
  return (
    <>
      <Container>
        <div>
          <img src={logo} alt="logo" />
          <strong>GYMPOINT</strong>

          <form action="">
            <span>SEU E-MAIL</span>
            <input type="email" placeholder="seu e-mail" name="" id="" />
            <span>SUA SENHA</span>
            <input type="password" placeholder="sua senha" name="" id="" />

            <button type="submit">Entrar no Sistema</button>
          </form>
        </div>
      </Container>
    </>
  );
}
