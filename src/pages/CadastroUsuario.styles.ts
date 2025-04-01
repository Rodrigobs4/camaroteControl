import styled from "styled-components";

// Contêiner principal
export const Container = styled.div`
  display: flex;
  flex-direction: row;
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 20px;
  gap: 20px;
`;

// Título
export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgb(84, 85, 88);
  text-align: center;
  margin-bottom: 20px;
`;

// Tabela Wrapper (Contêiner da Tabela)
export const TableWrapper = styled.div`
  width: 95%;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  overflow-x: auto;
`;

// Estilo do Drawer (janela deslizante para cadastro)
export const DrawerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  height: 100%;
  background-color: #fff;
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
`;

// Formulário de Cadastro
export const FormWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr; // Ajuste para exibir 1 coluna por vez
  gap: 1.5rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;

  &:hover {
    background-color: #5bbc79;
  }
`;

export const Success = styled.div`
  background-color: #d4edda;
  color: #155724;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
`;

export const Error = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  text-align: center;
`;

// Botão Novo usuário
export const ButtonNewUser = styled.button`
  width: 20%;
  padding: 0.7rem; /* Ajustado para não ser tão grande */
  background-color: #5bbc79;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box; /* Garante que o padding não ultrapasse a largura do botão */

  &:hover {
    background-color: rgb(74, 226, 122);
  }
`;
// Botão de Cadastro
export const ButtonSubmit = styled.button`
  width: 100%;
  padding: 1rem; /* Ajustado para não ser tão grande */
  background-color: #5bbc79;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box; /* Garante que o padding não ultrapasse a largura do botão */

  &:hover {
    background-color: rgb(74, 226, 122);
  }
`;
