import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import logo from '~/assets/logo.png';
import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispath = useDispatch();
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GymPoint" />
          <strong>GYMPOINT</strong>
          <Link to="/students">Alunos</Link>
          <Link to="/plans">Planos</Link>
          <Link to="/registries">Matriculas</Link>
          <Link to="/assistance">Pedido de Auxilio</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>Administrador</strong>
              <button
                onClick={() => dispath({ type: '@auth/SIGN_OUT' })}
                type="button"
              >
                Sair do Sistema
              </button>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
