import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
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

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', { params: { page } });
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
  }, [page]);

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

  return (
    <Container>
      <Content>
        <h1>Gerenciando Alunos</h1>
        <Form>
          <button type="button">
            <MdAdd />
            CADASTRAR
          </button>
          <div>
            <MdSearch size={16} />
            <Input placeholder="Buscar Aluno" type="text" name="search" />
          </div>
        </Form>
      </Content>
      <DataContainer>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>e-mail</th>
              <th>Idade</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {student.map(std => (
              <tr key={std.id}>
                <th className="name">{std.name}</th>
                <th className="email">{std.email}</th>
                <th className="age">{std.age}</th>
                <th className="ctrl">
                  <button type="button">
                    <MdEdit />
                  </button>
                  <button type="button">
                    <MdDeleteForever />
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
          <NavContainer activePg={n.actv}>
            <Form>
              <button
                key={n.pgn}
                type="button"
                onClick={() => handePageNav(n.pgn)}
              >
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
  );
}
