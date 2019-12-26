import React from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { isValid, differenceInYears, isPast } from 'date-fns';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Content } from './styles';
import api from '~/services/api';

export default function EditStudent() {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('Email é obrigatório'),
    gender: Yup.string(1, 'Insira M ou F').required('Insira M ou F'),
    birth_date: Yup.date('Insira uma data Válida dd/mm/yyyy').required(
      'Data Nascimento é Obrigatória'
    ),
    weight: Yup.number('Insira um número')
      .required('Insira um número, valor obrigatório')
      .positive('Insira um número positivo'),
    height: Yup.number('Insira um número')
      .required('Insira um número, valor obrigatório')
      .positive('Insira um número positivo'),
  });

  function handeCalculateAge(value) {
    const inputBirth = value;
    const lengthInputBirth = inputBirth.length;

    if (
      lengthInputBirth === 10 &&
      isValid(new Date(inputBirth)) &&
      isPast(new Date(inputBirth))
    ) {
      const newAge = differenceInYears(new Date(), new Date(inputBirth));
      document.querySelector('input[name=age]').value = newAge;
    } else {
      document.querySelector('input[name=age]').value = 'Invalido';
    }
  }

  async function handleAdd(data) {
    try {
      await api.post(`students`, data);
      toast.success('Cadastro realizado com sucesso!');
    } catch (err) {
      if (err) {
        toast.error(`Falha no Cadastro, verifique os dados registrados!${err}`);
      }
    }
  }

  return (
    <>
      <Container>
        <h1>Cadastro de Alunos</h1>
        <div>
          <Link to="/students">
            <MdNavigateBefore size={22} /> VOLTAR
          </Link>

          <button type="submit" form="frm">
            <MdCheck size={18} />
            SALVAR
          </button>
        </div>
      </Container>
      <Content>
        <Form id="frm" schema={schema} onSubmit={handleAdd}>
          <span className="label">Nome Completo</span>
          <Input type="text" name="name" />
          <span className="label">Endereço de e-mail</span>
          <Input type="text" name="email" />

          <div className="dataColun">
            <div className="detals">
              <span className="label">Data Nascimento</span>
              <Input
                type="text"
                name="birth_date"
                onChange={e => handeCalculateAge(e.target.value)}
              />
            </div>
            <div className="detals">
              <span className="label">Idade</span>
              <Input disabled type="text" name="age" />
            </div>
            <div className="detals">
              <span className="label">Sexo(M/F)</span>
              <Input type="text" name="gender" />
            </div>
            <div className="detals">
              <span className="label">Peso (Kg)</span>
              <Input type="text" name="weight" />
            </div>
            <div className="detals">
              <span className="label">Altura (metros)</span>
              <Input type="text" name="height" />
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
