import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1100px;
  margin: 20px auto;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e3346e;
    height: 32px;
    width: 150px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    margin-right: 15px;

    &:hover {
      background: ${darken(0.08, '#e3346e')};
    }
  }
`;
export const DataContainer = styled.div`
  margin: 10px auto;
  background: #fff;

  border-radius: 4px;
  table {
    border: none;
    width: 100%;
    thead {
      font-size: 18px;
      th {
        height: 28px;
      }
      th#titulo {
        width: 40%;
      }
      th#duracao {
        width: 20%;
      }
      th#valor {
        width: 20%;
      }
      th#ctrl {
        width: 20%;
      }
    }
    tbody {
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
