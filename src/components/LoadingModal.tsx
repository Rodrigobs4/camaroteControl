import React, { useState } from "react";
import { StyledModal } from "./LoadingModal.styles";
import { Player } from "@lottiefiles/react-lottie-player";

interface LoadingModalProps {
  visible: boolean;
  title: string;
}

const LoadingModal: React.FC<LoadingModalProps> = ({ visible, title }) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  return (
    <StyledModal
      title={title}
      visible={visible}
      footer={null}
      closable={false}
      centered
    >
      <div className="svg-container">
        <Player
          autoplay
          loop
          src="https://lottie.host/f1afab2c-ccf9-4ec3-8d0d-73eb75ede2b2/dG8nSbepyH.json"
          style={{ height: "150px", width: "150px" }}
          onEvent={(event) => {
            if (event === "load") {
              setAnimationLoaded(true);
            }
          }}
        />
        {!animationLoaded && <p>Carregando animação...</p>}
      </div>
      <p></p>
    </StyledModal>
  );
};

export default LoadingModal;
