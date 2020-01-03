import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { isValid, differenceInYears, isPast, parse } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
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
    birth_date: Yup.string('Insira uma data Válida dd/mm/yyyy').required(
      'Data Nascimento é Obrigatória'
    ),
    weight: Yup.number('Insira um número')
      .required('Insira um número, valor obrigatório')
      .positive('Insira um número positivo'),
    height: Yup.number('Insira um número')
      .required('Insira um número, valor obrigatório')
      .positive('Insira um número positivo'),
  });

  const [dateBirth, setDateBirth] = useState('');

  const ageStudent = useMemo(() => {
    const inputBirth = parse(dateBirth, 'mm/dd/yyyy', new Date(), {
      locale: pt,
    });
    const lengthInputBirth = dateBirth.length;

    if (
      lengthInputBirth === 10 &&
      isValid(new Date(inputBirth)) &&
      isPast(new Date(inputBirth))
    ) {
      return differenceInYears(new Date(), new Date(inputBirth));
    }
    return 'Invalido';
  }, [dateBirth]);

  async function handleAdd(data) {
    const formatedData = {
      birth_date: parse(data.birth_date, 'dd/MM/yyyy', new Date(), {
        locale: pt,
      }),
      name: data.name,
      email: data.email,
      gender: data.gender,
      weight: data.weight,
      height: data.height,
    };

    try {
      await api.post(`students`, formatedData);
      toast.success('Cadastro realizado com sucesso!');
    } catch (err) {
      if (err) {
        toast.error(`Falha no Cadastro, verifique:${err.response.data.error}`);
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
                value={dateBirth}
                onChange={e => setDateBirth(e.target.value)}
              />
            </div>
            <div className="detals">
              <span className="label">Idade</span>
              <Input disabled type="text" name="age" value={ageStudent} />
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
