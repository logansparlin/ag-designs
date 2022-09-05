// import { GetInTouchForm } from "@components/getInTouchForm";
import { motion } from "framer-motion";
import styled from 'styled-components';
import css from '@styled-system/css'

import { useAppStore } from "@hooks/useAppStore";
import { Box } from "@components/box";
import ContactForm from "./ContactForm";

const StyledOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  z-index: 4;
  display: flex;
  justify-content: center;
  align-items: center;
  
  ${css({
  bg: 'rgba(17, 17, 17, 0.9)',
  color: 'fg',
  fontFamily: 'sans'
})}
`;

const StyledBackdrop = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  left: 0;
  z-index: 3;
  backdrop-filter: blur(20px) brightness(80%);
  webkit-backdrop-filter: blur(20px) brightness(80%);
  pointer-events: none;
  user-select: none;
`;

const overlayVariants = {
  closed: {
    clipPath: 'inset(0 0 100% 0)',
    pointerEvents: 'none',
    y: -50
  },
  open: {
    clipPath: 'inset(0 0 0% 0)',
    pointerEvents: 'auto',
    y: 0
  }
}

const backdropVariants = {
  closed: {
    opacity: 0,
    transition: {
      duration: 1.4,
      ease: [.67, -0.01, .17, .98],
      delay: 0.2
    }
  },
  open: {
    opacity: 1,
    transition: {
      duration: 1,
      ease: [.67, -0.01, .17, .98],
    }
  }
}

export const ContactOverlay: React.FC<{ settings?: any }> = ({ settings }) => {
  const contactOpen = useAppStore(state => state.contactOpen);

  return (
    <>
      <StyledOverlay
        initial="closed"
        animate={contactOpen ? 'open' : 'closed'}
        variants={overlayVariants}
        transition={{
          duration: 1.4,
          ease: [.67, -0.01, .17, .98],
        }}
      >
        <ContactForm />
      </StyledOverlay>
      <StyledBackdrop
        initial="closed"
        animate={contactOpen ? 'open' : 'closed'}
        variants={backdropVariants}
      />
    </>
  )
};