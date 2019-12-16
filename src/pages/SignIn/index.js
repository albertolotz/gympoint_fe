import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { signInRequest } from '~/store/modules/auth/actions';

// import { toast } from 'react-toastify';
import logo from '~/assets/logo.png';
import { Container } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira Email Válido')
    .required('e-mail obrigatório'),
  password: Yup.string()
    .min(6, 'Senha com no mínimo 6 caracteres. ')
    .required('Senha precisa se preechida.'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Container>
        <div>
          <img src={logo} alt="logo" />
          <strong>GYMPOINT</strong>

          <Form schema={schema} onSubmit={handleSubmit}>
            <label>SEU E-MAIL</label>
            <Input type="email" placeholder="seu e-mail" name="email" />
            <label>SUA SENHA</label>
            <Input type="password" placeholder="sua senha" name="password" />

            <button type="submit">
              {loading ? 'Carregando ...' : 'Entrar no Sistema'}
            </button>
          </Form>
          <small>by Alberto Lotz - copyright 2019</small>
        </div>
      </Container>
    </>
  );
}
