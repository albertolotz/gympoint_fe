import React, { useState, useEffect, useMemo } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { MdCheck, MdNavigateBefore } from 'react-icons/md';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { addMonths, isValid, format, parse } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import { Container, Content } from './styles';
import api from '~/services/api';
import { styles } from './stylesLst';

export default function EditPlan() {
  const [student, setStudent] = useState([]);
  const [plan, setPlan] = useState([]);
  const [paramPlan, setparamPlan] = useState();
  const [selStd, setSelStd] = useState();
  const [selPla, setSelPla] = useState(0);
  const [selDta, setSelDta] = useState('');

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
    }

    loadLists();
  }, []);

  const ValCalc = useMemo(() => {
    if (selPla > 0) {
      const { duration, price } = paramPlan.find(p => p.id === selPla);
      const formatedTotalPrice = (duration * price).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
      });
      return formatedTotalPrice;
    }
    return 0;
  }, [paramPlan, selPla]);

  const dtaCalc = useMemo(() => {
    if (selPla > 0) {
      const lengthStartDate = selDta.length;
      const { duration } = paramPlan.find(p => p.id === selPla);
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
        return calculedFinalRegister;
      }
      return '';
    }
    return '';
  }, [paramPlan, selDta, selPla]);

  async function handleAdd({ start_date }) {
    const dateFormated = parse(start_date, 'dd/MM/yyyy', new Date());
    const dados = {
      student_id: selStd,
      plan_id: selPla,
      start_date: dateFormated,
    };

    if (!(await schema.isValid(dados))) {
      toast.error('Dados invalidos');
    } else {
      try {
        await api.post('registry', dados);
        toast.success('Matricula realizada com sucesso!');
      } catch (err) {
        if (err) {
          toast.error(err.response.data.error);
        }
      }
    }
  }

  return (
    <>
      <Container>
        <h1>Cadastro de Matriculas</h1>
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
        <Form id="frm" onSubmit={handleAdd}>
          <span className="label">Aluno</span>
          <Select
            isSearchable="true"
            styles={styles}
            options={student}
            name="name"
            onChange={e => setSelStd(e.value)}
          />
          <span className="label">Plano</span>
          <Select
            isSearchable="true"
            styles={styles}
            options={plan}
            name="title"
            onChange={e => setSelPla(e.value)}
          />

          <div className="dataColun">
            <div className="detals">
              <span className="label">Data Inicio</span>
              <Input
                type="text"
                name="start_date"
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
