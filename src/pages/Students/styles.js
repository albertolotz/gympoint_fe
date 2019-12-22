import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  padding: 0 30px;
`;

export const Content = styled.div`
  max-width: 1100px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  form {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 150px;
      height: 32px;
      background: #e3346e;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      margin-right: 15px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.08, '#e3346e')};
      }
    }

    div {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 32px;
      display: flex;
      align-items: center;
      padding: 0 10px;

      input {
        padding: 0 15px;
        color: #ccc;
        font-size: 16px;
        border: 0;
        height: 30px;
        font-size: 18px;
      }

      }
    }
  }
`;

export const DataContainer = styled.div`
  max-width: 1100px;
  margin: 10px auto;
  background: #fff;
  height: 440px;
  border: 1px solid #ccc;
  border-radius: 4px;

  table {
    border: 0;
    width: 100%;
    thead {
      font-size: 22px;
      th {
        height: 32px;
      }
    }
    tbody {
      th.name {
        width: 30%;
      }
      th.email {
        width: 30%;
      }
      th.age {
        width: 10%;
      }
      th.ctrl {
        width: 30%;
      }

      th {
        font-weight: normal;
        font-size: 16px;
        line-height: 200%;
        border-top: 1px solid #d9d9d9;
        color: #333;
      }
      a {
        padding: 20px 0;
        color: #333;
        &:hover {
          color: #e3346e;
        }
      }
      button {
        border: 0;
        background: none;
        margin: 0 25px;
        color: #333;
        &:hover {
          color: #e3346e;
        }
      }
    }
  }
`;

export const PageContainer = styled.div`
  max-width: 1100px;
  margin: 5px auto;
  display: flex;
  align-items: center;
  justify-content: center;

  button {
    border: 0;
    background: none;
    margin: 0 auto;
    font-size: 32px;
    color: #333;
    &:hover {
      color: #e3346e;
    }
  }
`;

export const NavContainer = styled.div`
  form {
    button {
      border: 0;
      background: none;
      margin: 0 10px;
      font-size: 16px;
      color: ${props => (props.activePg ? '#e3346e' : '#333')};

      &:hover {
        color: #e3346e;
      }
    }
  }
`;
