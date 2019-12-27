import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  MdAdd,
  MdSearch,
  MdDeleteForever,
  MdEdit,
  MdNavigateNext,
  MdNavigateBefore,
  MdCheck,
  MdCancel,
} from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  Content,
  DataContainer,
  PageContainer,
  NavContainer,
} from './styles';

export default function Registries() {
  const [register, setRegister] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [cPages, setCPages] = useState();
  const [q, setTxtSearch] = useState('');

  useEffect(() => {
    async function loadRegistries() {
      const response = await api.get('registry', { params: { page, q } });
      // controle de paginação
      const pgsApi = response.data.pages;
      const countPages = [];
      let pg = 0;
      do {
        pg += 1;
        countPages.push(pg);
      } while (pg < pgsApi);

      const t = countPages.map(pgn => {
        const pgActv = pgn === page;
        return {
          pgn,
          actv: pgActv,
        };
      });

      const reg = response.data.registries.map(r => {
        const start_dateFormated = format(
          parseISO(r.start_date),
          'dd/MM/yyyy',
          {
            locale: pt,
          }
        );
        const end_dateFormated = format(parseISO(r.end_date), 'dd/MM/yyyy', {
          locale: pt,
        });

        const isActive = r.active === true ? 'Sim' : 'Nao';

        return {
          id: r.id,
          name: r.Aluno.name,
          title: r.Plano.title,
          start_date: start_dateFormated,
          end_date: end_dateFormated,
          active: isActive,
        };
      });
      setCPages(pgsApi);
      setPages(t);
      setRegister(reg);
    }

    loadRegistries();
  }, [page, q]);

  function handlePageUp() {
    if (page < cPages) {
      setPage(page + 1);
    }
  }

  function handePageDown() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function handePageNav(pg) {
    setPage(pg);
  }

  function handleSearch(event) {
    setTxtSearch(event.target.value);
  }

  async function handleDelete(id) {
    // eslint-disable-next-line no-alert
    if (window.confirm(`Confirma a exclusão ?${id}`)) {
      try {
        await api.delete(`registy/${id}`);
        toast.warn('Aluno Apagado!');
        setPage(1);
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
          <h1>Gerenciando Matrículas</h1>
          <div>
            <Link to="/registriesadd">
              <MdAdd />
              CADASTRAR
            </Link>
            <div>
              <MdSearch size={16} />
              <Input
                onChange={handleSearch}
                placeholder="Buscar Aluno"
                type="text"
                name="search"
              />
            </div>
          </div>
        </Content>
        <DataContainer>
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Plano</th>
                <th>Inicio</th>
                <th>Término</th>
                <th>Ativa</th>
                <th>{}</th>
              </tr>
            </thead>
            <tbody>
              {register.map(rg => (
                <tr key={rg.id}>
                  <th className="aluno">{rg.name}</th>
                  <th className="plano">{rg.title}</th>
                  <th className="inicio">{rg.start_date}</th>
                  <th className="termino">{rg.end_date}</th>
                  <th className="ativa">
                    {rg.active === 'Sim' ? (
                      <MdCheck size={22} color="#186b19" />
                    ) : (
                      <MdCancel size={18} color="#d91616" />
                    )}
                  </th>
                  <th className="ctrl">
                    <Link to={`/registriesedit/${rg.id}`}>
                      <MdEdit size={26} />
                    </Link>
                    <button onClick={() => handleDelete(rg.id)} type="button">
                      <MdDeleteForever size={26} />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </DataContainer>
        <PageContainer>
          <button type="button" onClick={() => handePageDown()}>
            <MdNavigateBefore />
          </button>

          {pages.map(n => (
            <NavContainer key={n.pgn} activePg={n.actv}>
              <Form>
                <button type="button" onClick={() => handePageNav(n.pgn)}>
                  {n.pgn}
                </button>
              </Form>
            </NavContainer>
          ))}

          <button type="button" onClick={() => handlePageUp()}>
            <MdNavigateNext />
          </button>
        </PageContainer>
      </Container>
    </>
  );
}
