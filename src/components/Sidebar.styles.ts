import styled from "styled-components";
import { Link } from "react-router-dom";

export const SidebarContainer = styled.aside`
  width: 240px;
  background: #f9fafb;
  height: 100vh;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  /*border-right: 1px solid #e5e7eb;*/
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-weight: 500;
  color: #2563eb;
  flex-direction: column; /* Coloca a imagem e o texto um embaixo do outro */

  img {
    width: 100px; /* Ajuste o valor para o tamanho desejado */
    height: auto; /* Para manter a proporção da imagem */
    object-fit: contain;
  }

  span {
    margin-top: 0px;
    font-size: 1.5rem;
    color: #5bbc79;
    text-align: center;
  }
`;

export const MenuSection = styled.div`
  margin-top: 1rem;
`;

export const MenuTitle = styled.h3`
  font-size: 0.8rem;
  color: rgb(120, 123, 130);
  margin-bottom: 0.8rem;
`;

export const MenuItem = styled(Link)<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  color: ${({ $active }) => ($active ? "#4CAF50" : "#6b7280")};
  text-decoration: none;
  background-color: ${({ $active }) =>
    $active ? "rgba(76, 175, 80, 0.1)" : "transparent"};
  border-radius: 8px;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: rgba(76, 175, 80, 0.1);
    color: #4caf50;
  }

  svg {
    font-size: 1.5rem;
  }
`;
