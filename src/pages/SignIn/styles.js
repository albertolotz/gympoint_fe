import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #ee4d64;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  div {
    height: 400px;
    width: 300px;
    background-color: #fff;
    border-radius: 4px;
    padding: 20px 30px;
    box-shadow: 7px 7px 5px rgba(0, 0, 0, 0.3);

    img {
      width: 150px;
      display: block;
      margin-left: auto;
      margin-right: auto;
    }
    strong {
      text-align: center;
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      font-size: 28px;
      color: #ee4d64;
    }

    form {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      span {
        margin: 10px 0 5px 0;
        font-size: 12px;
      }
      input {
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 44px;
        padding: 0 15px;
        color: #333;
        font-size: 16px;
      }

      button {
        margin: 10px 0;
        height: 44px;
        background: #ee4d64;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.3s;

        &:hover {
          background: ${darken(0.05, '#ee4d64')};
        }
      }
    }
  }
`;
