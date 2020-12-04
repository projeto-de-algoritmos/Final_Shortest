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
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #000;
`;
export const Body = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
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
export const Text = styled.p`
  margin-bottom: 5px;
  font-size: 30px;
  color: #fff;
  padding: 4px;
  text-align: center;
`;
export const Bottom = styled.div`
  height: 10%;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #000;
`;
