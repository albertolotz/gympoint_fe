import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdChat } from 'react-icons/md';
import { Container, Content, DataContainer } from './styles';
import api from '~/services/api';

export default function Assistance() {
  const [assistence, setAssistence] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function loadAssistances() {
      setLoad(false);
      const response = await api.get('orderhelp', {});
      const students = await api.get('studentsall');
      const ass = response.data.helpOrders.map(as => {
        const studentName = students.data.students.find(
          s => s.id === as.student_id
        );
        const nameStudentFinal =
          studentName && studentName.name ? studentName.name : '< Sem Nome >';
        return {
          id: as._id,
          student: nameStudentFinal,
        };
      });
      setAssistence(ass);
    }
    loadAssistances();
  }, [load]);

  return (
    <>
      <Container>
        <Content>
          <h1>Pedidos de Auxilio</h1>
        </Content>
        <DataContainer>
          <table>
            <thead>
              <tr>
                <th id="Aluno">ALUNO</th>
                <th id="ctrl">{}</th>
              </tr>
            </thead>
            <tbody>
              {assistence.map(ass => (
                <tr key={ass.id}>
                  <th>{ass.student}</th>
                  <th>
                    <Link to={`/assistanceanswer/${ass.id}`}>
                      <MdChat size={26} />
                    </Link>
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
