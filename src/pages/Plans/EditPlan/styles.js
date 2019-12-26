import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1100px;
  margin: 20px auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  div {
    a {
      background-color: #5c5e61;
      height: 32px;
      width: 120px;
      padding: 6px 28px;
      border-radius: 4px;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      margin-right: 15px;
      text-align: center;
      vertical-align: center;
      &:hover {
        background: ${darken(0.08, '#5c5e61')};
      }
    }


    }
    button {
      background: #e3346e;
      width: 150px;
      height: 32px;
      font-weight: bold;
      font-size: 16px;
      color: #fff;
      border: 0;
      border-radius: 4px;
      margin-right: 15px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.08, '#e3346e')};
      }
    }
  }
`;

export const Content = styled.div`
  padding: 20px 0;
  max-width: 1100px;
  margin: 20px auto;
  display: flex;
  border: 0;
  border-radius: 4px;
  justify-content: center;
  align-items: center;
  background: #fff;
  form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    width: 50%;

    .label {
      color: #333;
      font-size: 18px;
      margin-top: 10px;
    }

    span {
      color: #9e2906;
      font-size: 12px;
    }

    input {
      border: 1px solid #666;
      border-radius: 4px;
      padding: 0 15px;
      color: #333;
      font-size: 16px;
      height: 30px;
      margin-bottom: 5px;
    }
    .dataColun {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      .detals {
        display: flex;
        flex-direction: column;
        padding: 10px 0px;
        width: 30%;
        margin: 0 5px;
      }
      input {
        width: 100%;
      }
    }
  }
`;
