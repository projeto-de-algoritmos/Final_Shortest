import styled from "styled-components";
import { darken } from "polished";
export const Container = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #fff, #000);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
export const Header = styled.div`
  height: 10%;
  width: 100%;
  flex-direction: column;
  vertical-align: middle;
  background: #000;
  justify-content: center;
  align-items: center;
  display: flex;
`;
export const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
`;
export const Menu = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  background: #000;
  align-items: center;
  flex-direction: column;
  button {
    margin: 15px;
    padding: 10px;
    height: 8%;
    width: 60%;
    background: linear-gradient(-90deg, #fff, #000);
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.03, "#3b9eff")};
    }
  }
  textAlign = center;
`;
export const Text = styled.p`
  font-size: 30px;
  color: #fff;
  text-align: center;
`;
export const SubText = styled.p`
  font-size: 30px;
  color: #ff0;
  text-align: center;
`;
export const Conditional = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
export const Bottom = styled.div`
  height: 10%;
  width: 100%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background: #000;
  display: flex;
`;

export const FormContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    button {
      margin: 15px;
      padding: 10px;
      height: 8%;
      width: 60%;
      background: linear-gradient(-90deg, #fff, #000);
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.03, "#3b9eff")};
      }
    }
`;

export const Input = styled.input`
  background: rgba(0, 0, 0, 0.1);
  border: 1;
  border-color: #fff;
  border-radius: 4px;
  height: 35px;
  padding: 0 15px;
  color: #fff;
  margin: 0 0 10px;
  &::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
`;
