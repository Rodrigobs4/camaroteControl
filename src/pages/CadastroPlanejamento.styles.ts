import styled from "styled-components";
import { Button, Drawer } from "antd";

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(84, 85, 88);
  text-align: center;
  margin-bottom: 20px;
`;

export const TableWrapper = styled.div`
  margin: 2rem;
  background: #fff;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const ButtonSubmit = styled(Button)`
  width: 100%;
  margin-top: 1rem;
`;

export const Success = styled.p`
  color: green;
  text-align: center;
`;

export const Error = styled.p`
  color: red;
  text-align: center;
`;

export const StyledTransferDrawer = styled(Drawer)`
  .ant-drawer-body {
    padding-bottom: 80px;
  }
`;

export const ContainerFiltro = styled.div`
  margin: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

// Botão Novo add camisas
export const ButtonNewShirt = styled.button`
  padding: 0.7rem;
  background-color: #5bbc79;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;

  &:hover {
    background-color: rgb(74, 226, 122);
  }
`;
