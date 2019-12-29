import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { Form, Textarea } from '@rocketseat/unform';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { Container, Content, Head } from './styles';
import api from '~/services/api';

export default function Answer() {
  const history = useHistory();
  const [question, setQuestion] = useState('');
  const { id } = useParams();

  useEffect(() => {
    async function loadAnswer() {
      const response = await api.get(`orderhelp`);
      const orderToAnswer = response.data.helpOrders.find(r => r._id === id);
      const ques = {
        question: orderToAnswer.question,
      };
      setQuestion(ques);
    }
    loadAnswer();
  }, [id]);

  const schema = Yup.object().shape({
    answer: Yup.string().required('Informe qual a resposta ...'),
  });

  async function handleAnswer(data) {
    try {
      await api.put(`orderhelp/${id}`, data);
      toast.success('Resposta enviada com sucesso!');
      history.push('/assistance');
    } catch (err) {
      if (err) {
        toast.error(`Falha no envio, verifique os dados!${err}`);
      }
    }
  }

  return (
    <>
      <Container>
        <Head>
          <h1>Suporte ao Aluno</h1>
          <div>
            <Link to="/assistance">
              <MdNavigateBefore size={22} /> VOLTAR
            </Link>
          </div>
        </Head>
      </Container>
      <Content>
        <div>
          <Form schema={schema} onSubmit={handleAnswer}>
            <span>Pergunta do Aluno</span>
            <p>{question.question}</p>
            <span>Sua Resposta</span>
            <Textarea name="answer" />
            <button type="submit">
              <MdCheck size={18} />
              RESPONDER
            </button>
          </Form>
        </div>
      </Content>
    </>
  );
}
