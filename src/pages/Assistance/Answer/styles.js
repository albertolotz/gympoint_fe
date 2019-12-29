import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 550px;
  margin: 20px auto;
`;
export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-content: center;

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
`;

export const Content = styled.div`
  max-width: 550px;
  margin: 10px auto;
  background: #fff;
  border-radius: 4px;

  span {
    font-weight: bold;
    font-size: 18px;
    margin-top: 20px;
  }
  div {
    margin: 10px 15px;
    padding-top: 15px;
  }
  p {
    padding: 10px;
  }
  textarea {
    margin-top: 15px;
    width: 100%;
    height: 150px;
    border: 0;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    color: #333;
  }
  button {
    background: #e3346e;
    width: 100%;
    height: 32px;
    font-weight: bold;
    font-size: 16px;
    color: #fff;
    border: 0;
    border-radius: 4px;
    margin: 15px auto;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.08, '#e3346e')};
    }
  }
`;
