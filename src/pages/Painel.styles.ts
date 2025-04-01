import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  background-color: #f9fafb;
  height: 100vh;
  overflow: hidden;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: calc(
    100vh - 100px
  ); /* Ajuste conforme necessário para a altura da tela */
  overflow-y: auto; /* Adiciona o scroll vertical */
  padding: 0.5rem; /* Adiciona um pouco de espaço ao redor do conteúdo */
`;

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 600;
  color: #1f2937;
`;

export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
`;

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  text-align: left;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: space-between;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  }
`;

export const CardLabel = styled.div`
  font-size: 0.8rem;
  color: #4b5563;
  font-weight: bold;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

export const CardValueAndPercentage = styled.div`
  display: flex;
  align-items: center;
  gap: 15px; /* Espaço entre o valor e o percentual */
`;

export const CardValue = styled.div`
  font-size: 1.5rem;
  color: rgb(59, 66, 80); /* Cor principal de destaque */
  font-weight: 700;
`;

export const CardPercentage = styled.div<{ percentage: number }>`
  font-size: 0.8rem;
  color: ${({ percentage }) =>
    percentage > 0
      ? "#22c55e"
      : "#f59e0b"}; /* Verde para positivo e laranja para negativo */
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const CardLabelAndIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 8px; /* Espaço entre o ícone e o texto */
`;
export const CardIcon = styled.div`
  background-color: #f4f4f5;
  padding: 10px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  width: 16px;
  height: 16px;
`;

export const ChartContainer = styled.div`
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  margin-top: 3rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.2rem;
    font-weight: 600;
    color: #1f2937;
    margin-bottom: 1.5rem;
  }

  canvas {
    max-height: 320px;
    width: 100% !important;
  }
`;
