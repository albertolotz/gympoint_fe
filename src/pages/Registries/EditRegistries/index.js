import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link, useParams } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addMonths, isValid, format, parse, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Container, Content } from './styles';
import api from '~/services/api';
import { styles } from './stylesLst';

export default function EditPlan() {
  const { id } = useParams();

  const [student, setStudent] = useState([]);
  const [plan, setPlan] = useState([]);
  const [paramPlan, setparamPlan] = useState();
  const [selStd, setSelStd] = useState();
  const [selDta, setSelDta] = useState('');
  const [dtaCalc, setDtaCalc] = useState('');
  const [ValCalc, setValCalc] = useState(0);
  const [registry, setRegistry] = useState([]);
  const [getStuID, setGetStuID] = useState({});
  const [getPlaID, setGetPlaID] = useState({ label: '', value: 0 });

  const schema = Yup.object().shape({
    student_id: Yup.number('Insira um número').required(
      'Insira um número, valor obrigatório'
    ),
    plan_id: Yup.number('Insira um número').required(
      'Insira um número, valor obrigatório'
    ),
    start_date: Yup.date('Insira uma data válida').required(
      'Insira uma data válida'
    ),
  });

  useEffect(() => {
    // calculo do valor total
    if (getPlaID.value > 0) {
      const { duration, price } = paramPlan.find(p => p.id === getPlaID.value);
      const formatedTotalPrice = (duration * price).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });
      setValCalc(formatedTotalPrice);

      // calculo termin plano.

      const lengthStartDate = selDta.length;

      if (
        isValid(parse(selDta, 'mm/dd/yyyy', new Date())) &&
        lengthStartDate === 10
      ) {
        const calculedFinalRegister = format(
          addMonths(parse(selDta, 'dd/MM/yyyy', new Date()), duration, {
            locale: pt,
          }),
          'dd/MM/yyyy',
          { locale: pt }
        );
        setDtaCalc(calculedFinalRegister);
      } else {
        setDtaCalc('??');
      }
    }
  }, [getPlaID, paramPlan, selDta]);

  useEffect(() => {
    async function loadLists() {
      const response = await api.get('studentsall');
      const loadOption = response.data.students.map(l => {
        return {
          label: l.name,
          value: l.id,
        };
      });
      setStudent(loadOption);

      const plans = await api.get('plans');
      const loadPlans = plans.data.map(p => {
        return {
          label: p.title,
          value: p.id,
        };
      });
      setPlan(loadPlans);

      const pp = plans.data.map(p => {
        return {
          id: p.id,
          price: p.price,
          duration: p.duration,
        };
      });
      setparamPlan(pp);

      const registyToEdit = await api.get(`registry/${id}`);
      const r = registyToEdit.data.registries;

      const rgty = {
        student_id: r.student_id,
        plan_id: r.plan_id,
        start_date: format(new Date(r.start_date), 'dd/MM/yyyy'),
        end_date: format(new Date(r.end_date), 'dd/MM/yyyy'),
        price: r.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        }),
      };
      const labelStudent = loadOption.find(p => p.value === rgty.student_id);
      setGetStuID({ label: labelStudent.label, value: rgty.student_id });

      const labelPlan = loadPlans.find(p => p.value === rgty.plan_id);
      setGetPlaID({ label: labelPlan.label, value: rgty.plan_id });
      setSelDta(rgty.start_date);
      setDtaCalc(rgty.end_date);
      setValCalc(rgty.price);

      setRegistry(rgty);
    } // end load list
    loadLists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleEdit({ start_date }) {
    // const dateFormated = format(new Date(start_date), 'dd/MM/yyyy');
    const dateFormated = parse(start_date, 'dd/MM/yyyy', new Date());
    const dados = {
      student_id: getStuID.value,
      plan_id: getPlaID.value,
      start_date: dateFormated,
    };

    if (!(await schema.isValid(dados))) {
      toast.error('Dados invalidos');
    } else {
      try {
        await api.put(`registry/${id}`, dados);
        toast.success('Matricula Atualizada com sucesso!');
      } catch (err) {
        if (err) {
          toast.error(err.response.data);
        }
      }
    }
  }

  return (
    <>
      <Container>
        <h1>Edição de xxxMatriculas</h1>
        <div>
          <Link to="/registries">
            <MdNavigateBefore size={22} /> VOLTAR
          </Link>

          <button type="submit" form="frm">
            <MdCheck size={18} />
            SALVAR
          </button>
        </div>
      </Container>
      <Content>
        <Form id="frm" onSubmit={handleEdit}>
          <span className="label">Aluno</span>
          <Select
            isSearchable="true"
            styles={styles}
            options={student}
            name="name"
            value={getStuID}
            onChange={e => setGetStuID({ label: e.label, value: e.value })}
          />
          <span className="label">Plano</span>
          <Select
            isSearchable="true"
            styles={styles}
            options={plan}
            name="title"
            value={getPlaID}
            onChange={e => setGetPlaID({ label: e.label, value: e.value })}
          />

          <div className="dataColun">
            <div className="detals">
              <span className="label">Data Inicio</span>
              <Input
                type="text"
                name="start_date"
                value={selDta}
                onChange={e => setSelDta(e.target.value)}
              />
            </div>
            <div className="detals">
              <span className="label">Data Término</span>
              <Input value={dtaCalc} disabled type="text" name="end_date" />
            </div>

            <div className="detals">
              <span className="label">Valor Final</span>
              <Input value={ValCalc} disabled type="text" name="totalPrice" />
            </div>
          </div>
        </Form>
      </Content>
    </>
  );
}
