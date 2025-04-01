import styled from "styled-components";
import { Modal } from "antd";

export const StyledModal = styled(Modal)`
  /* Header transparente sem borda inferior */
  .ant-modal-header {
    background: transparent !important;
    border-bottom: none !important;
  }

  /* Conteúdo transparente, sem sombra, centralizado */
  .ant-modal-content {
    background: transparent !important;
    box-shadow: none !important;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Footer transparente sem borda superior */
  .ant-modal-footer {
    background: transparent !important;
    border-top: none !important;
  }

  /* Container para o SVG */
  .svg-container {
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
