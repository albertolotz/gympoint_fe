import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdSearch,
  MdDeleteForever,
  MdEdit,
  MdNavigateNext,
  MdNavigateBefore,
} from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  Content,
  DataContainer,
  PageContainer,
  NavContainer,
} from './styles';

export default function Students() {
  const [student, setStudent] = useState([]); // composição da página
  const [page, setPage] = useState(1); // é a página atual sendo visualizada
  const [pages, setPages] = useState([]); // é a relação da páginas com seu status utilizada para setar a cor da pg selecionada
  const [cPages, setCPages] = useState(); // é o numero de paginas recebida da API
  const [q, setTxtSearch] = useState(''); // q is a query param to select a fild at data.

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', { params: { page, q } });
      const pgsApi = response.data.pages;
      // cria a quantiade de páginas com referencia recebida da API
      // devido ao prazo apertado não foi criado um controle de numero máximo
      // de páginas por que é apresentada no rodapé da página.
      const countPages = [];
      let pg = 0;
      do {
        pg += 1;
        countPages.push(pg);
      } while (pg < pgsApi);

      const listPageStatus = countPages.map(pgn => {
        const pgActv = pgn === page;
        return {
          pgn,
          actv: pgActv,
        };
      });

      setCPages(pgsApi);
      setPages(listPageStatus);
      setStudent(response.data.students);
    }

    loadStudents();
  }, [page, q, student]);

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
    // calculo para saber qual página fica apos apagar um registro.
    const pageToStay = student.length === 1 && page > 1 ? page - 1 : page;

    // eslint-disable-next-line no-alert
    if (window.confirm(`Confirma a exclusão ?${id}`)) {
      try {
        await api.delete(`students/${id}`);
        toast.warn('Aluno Apagado!');
        setPage(pageToStay);
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
          <h1>Gerenciando Alunos</h1>
          <div>
            <Link to="/studentsadd">
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
                <th>Nome</th>
                <th>e-mail</th>
                <th>Idade</th>
                <th>{}</th>
              </tr>
            </thead>
            <tbody>
              {student.map(std => (
                <tr key={std.id}>
                  <th className="name">{std.name}</th>
                  <th className="email">{std.email}</th>
                  <th className="age">{std.age}</th>
                  <th className="ctrl">
                    <Link to={`/studentsedit/${std.id}`}>
                      <MdEdit size={26} />
                    </Link>
                    <button onClick={() => handleDelete(std.id)} type="button">
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
