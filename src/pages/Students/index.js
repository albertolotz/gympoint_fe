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
  const [student, setStudent] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [cPages, setCPages] = useState();
  const [q, setTxtSearch] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', { params: { page, q } });
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

      setCPages(pgsApi);
      setPages(t);
      setStudent(response.data.students);
    }

    loadStudents();
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
        await api.delete(`students/${id}`);
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
