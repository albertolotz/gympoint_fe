import React from 'react';
import { Link } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Content } from './styles';
import api from '~/services/api';

export default function EditPlan() {
  const schema = Yup.object().shape({
    title: Yup.string().required('Titulo é obrigatório'),
    duration: Yup.number('Insira um número')
      .required('Insira um número, valor obrigatório')
      .positive('Insira um número positivo'),
    price: Yup.number('Insira um número')
      .required('Insira um número, valor obrigatório')
      .positive('Insira um número positivo'),
  });

  function handeCalculatePrice() {
    const inputPrice = document.querySelector('input[name=duration]').value;
    const totalDuration = document.querySelector('input[name=price]').value;

    const newTotalPrice = (totalDuration * inputPrice).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    document.querySelector('input[name=totalPrice]').value = newTotalPrice;
  }

  async function handleAdd(data) {
    try {
      await api.post('plans', data);
      toast.success('Cadastro realizado com sucesso!');
    } catch (err) {
      if (err) {
        toast.error(`Falha no adastro, verifique os dados registrados!${err}`);
      }
    }
  }

  return (
    <>
      <Container>
        <h1>Cadastro de Planos</h1>
        <div>
          <Link to="/Plans">
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
          <span className="label">Título do Plano</span>
          <Input type="text" name="title" />

          <div className="dataColun">
            <div className="detals">
              <span className="label">Duração (Meses)</span>
              <Input
                onChange={handeCalculatePrice}
                type="text"
                name="duration"
              />
            </div>
            <div className="detals">
              <span className="label">Preço Mensal</span>
              <Input onChange={handeCalculatePrice} type="text" name="price" />
            </div>
            <div className="detals">
              <span className="label">Preço Total</span>
              <Input disabled type="text" name="totalPrice" />
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
