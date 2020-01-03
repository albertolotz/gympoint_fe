import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 850px) {
    a {
      font-size: 10px;
    }
  }

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
      width: 60px;
    }
    a#logoName {
      font-size: 20px;
      font-weight: bold;
      color: #ee4d64;
      padding-right: 20px;
      margin-right: 10px;
      border-right: 1px solid #666;
    }

    a {
      font-size: 16px;
      color: #333;
      margin: 0 10px;
      text-transform: uppercase;

      &:hover {
        color: #ee4d64;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;
export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #333;
    }
    button {
      border: none;
      background: none;
      display: block;
      margin-top: 2px;
      font-size: 14px;
      color: #d52727;
    }
  }
`;
