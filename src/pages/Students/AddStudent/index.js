import React from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from './styles';

export default function EditStudent() {
  return (
    <>
      <Container>
        <h1>Cadastro de Alunos</h1>
        <div>
          <Link to="/Students">
            <MdNavigateBefore size={20} /> VOLTAR
          </Link>

          <button type="button">
            <MdCheck size={18} />
            SALVAR
          </button>
        </div>
      </Container>
      <Content>
        <Form>
          <span>Nome Completo</span>
          <Input type="text" name="name" />
          <span>Endereço de e-mail</span>
          <Input type="text" name="email" />

          <div className="dataColun">
            <div className="detals">
              <span>Data Nascimento</span>
              <Input type="text" name="birth" />
            </div>
            <div className="detals">
              <span>Idade</span>
              <Input type="text" name="age" />
            </div>
            <div className="detals">
              <span>Sexo(M/F)</span>
              <Input type="text" name="sexo" />
            </div>
            <div className="detals">
              <span>Peso</span>
              <Input type="text" name="weight" />
            </div>
            <div className="detals">
              <span>Altura</span>
              <Input type="text" name="height" />
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
