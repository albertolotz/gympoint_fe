import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { format, parseISO } from 'date-fns';
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

  const { id } = useParams();
  const [student, setStudent] = useState([]);

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${id}`);
      const s = response.data;
      const std = {
        name: s.name,
        email: s.email,
        birth_date: format(parseISO(s.birth_date), 'dd/MM/yyyy'),
        age: s.age,
        gender: s.gender,
        weight: s.weight,
        height: s.height,
      };
      setStudent(std);
    }

    loadStudent();
  }, [id]);

  async function handleEdit(data) {
    try {
      await api.put(`students/${id}`, data);
      toast.success('Alteração realizada com sucesso!');
    } catch (err) {
      if (err) {
        toast.error(
          `Falha na alteração, verifique os dados registrados!${err}`
        );
      }
    }
  }

  return (
    <>
      <Container>
        <h1>Edição de Alunos</h1>
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
        <Form
          id="frm"
          schema={schema}
          initialData={student}
          onSubmit={handleEdit}
        >
          <span className="label">Nome Completo</span>
          <Input type="text" name="name" />
          <span className="label">Endereço de e-mail</span>
          <Input type="text" name="email" />

          <div className="dataColun">
            <div className="detals">
              <span className="label">Data Nascimento</span>
              <Input type="text" name="birth_date" />
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
