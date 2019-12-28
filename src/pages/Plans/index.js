import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd, MdDeleteForever, MdEdit } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container, Content, DataContainer } from './styles';
import api from '~/services/api';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans', {});

      const pln = response.data.map(pl => {
        const priceFormated = pl.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        });
        return {
          id: pl.id,
          title: pl.title,
          duration: `${pl.duration}${pl.duration > 1 ? ' Meses' : ' Mês'}`,
          price: priceFormated,
        };
      });
      setPlans(pln);
    }
    loadPlans();
  }, []);

  async function handleDelete(id) {
    const status = { active: false };

    // eslint-disable-next-line no-alert
    if (window.confirm(`Gostaria de Desativar Plano ?${id}`)) {
      try {
        await api.put(`plans/${id}/onoff`, status);
        toast.warn('Plano desativado!');
        // atualiza listagem
      } catch (err) {
        if (err) {
          toast.error('Falha na operação!');
        }
      }
    }
  }

  return (
    <>
      <Container>
        <Content>
          <h1>Gerenciando planos</h1>
          <Link to="/plansadd">
            <MdAdd size={22} />
            CADASTRAR
          </Link>
        </Content>
        <DataContainer>
          <table>
            <thead>
              <tr>
                <th id="titulo">TÍTULO</th>
                <th id="duracao">DURAÇÃO</th>
                <th id="valor">VALOR p MÊS</th>
                <th id="ctrl">{}</th>
              </tr>
            </thead>
            <tbody>
              {plans.map(pl => (
                <tr key={pl.id}>
                  <th>{pl.title}</th>
                  <th>{pl.duration}</th>
                  <th>{pl.price}</th>
                  <th>
                    <Link to={`/plansedit/${pl.id}`}>
                      <MdEdit size={26} />
                    </Link>
                    <button onClick={() => handleDelete(pl.id)} type="button">
                      <MdDeleteForever size={26} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </DataContainer>
      </Container>
    </>
  );
}
