import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
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

  const { id } = useParams(); // id do plano que será editado
  const [plans, setPlans] = useState([]); // dados do plano
  const [price, setPrice] = useState(0); // preco unitario
  const [duration, setDuration] = useState(0); // duração

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`plans/${id}`);
      // pl é u plano, feito para facilitar a mensão as variaveis
      const pl = response.data;

      const priceFormated = pl.price.toLocaleString('US', {
        minimumFractionDigits: 2,
      });

      const pln = {
        id: pl.id,
        title: pl.title,
        duration: setDuration(pl.duration),
        price: setPrice(priceFormated),
      };
      setPlans(pln);
    }
    loadPlans();
  }, [id]);

  const priceCalculed = useMemo(() => {
    const newTotalPrice = (duration * price).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return newTotalPrice;
  }, [price, duration]);

  async function handleEdit(data) {
    try {
      await api.put(`plans/${id}`, data);
      toast.success('Alteração realizada com sucesso!');
    } catch (err) {
      if (err) {
        toast.error(
          `Falha na alteração, verifique: ${err.response.data.error}`
        );
      }
    }
  }

  return (
    <>
      <Container>
        <h1>Edição de Planos</h1>
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
        <Form
          id="frm"
          schema={schema}
          initialData={plans}
          onSubmit={handleEdit}
        >
          <span className="label">Título do Plano</span>
          <Input type="text" name="title" />

          <div className="dataColun">
            <div className="detals">
              <span className="label">Duração (Meses)</span>
              <Input
                value={duration}
                onChange={e => setDuration(e.target.value)}
                type="text"
                name="duration"
              />
            </div>
            <div className="detals">
              <span className="label">Preço Mensal</span>
              <Input
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="text"
                name="price"
              />
            </div>
            <div className="detals">
              <span className="label">Preço Total</span>
              <Input
                disabled
                type="text"
                name="totalPrice"
                value={priceCalculed}
              />
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
