import { useEffect, useState } from "react";
import { urlFor } from "@lib/sanity";
import {AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';

import { Box } from "./box";
import Image from 'next/image';
import ChevronLeft from "./ChevronLeft";
import ChevronRight from "./ChevronRight";

const StyledImage = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  will-change: auto;
`;

export const StyledIcon = styled.button`
  appearance: none;
  border: none;
  outline: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  right: ${props => props.$next ? '12px' : 'auto'};
  left: ${props => props.$previous ? '12px' : 'auto'};
`

const ProjectListImages = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState('');
  const [activeImage, setActiveImage] = useState({
    url: urlFor(images[activeIndex].image).auto('format').width(1000).url(),
    lqip: images[activeIndex].metadata.lqip
  });
  
  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection('next');
    if(activeIndex >= images.length - 1) {
      return setActiveIndex(0);
    }

    return setActiveIndex(activeIndex + 1);
  }
  
  const previousImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDirection('previous');
    if(activeIndex == 0) {
      return setActiveIndex(images.length - 1);
    }

    return setActiveIndex(activeIndex - 1);
  }

  useEffect(() => {
    setActiveImage({
      url: urlFor(images[activeIndex].image).auto('format').width(1000).url(),
      lqip: images[activeIndex].metadata.lqip
    })
  }, [activeIndex]);

  return (
    <Box position="absolute" width="100%" height="100%" overflow="hidden">
      <StyledIcon $next onClick={nextImage}>
        <ChevronRight />
      </StyledIcon>
      <StyledIcon $previous onClick={previousImage}>
        <ChevronLeft />
      </StyledIcon>
      <AnimatePresence initial={false}>  
        <StyledImage 
          key={activeImage.url}
          initial={{ x: direction === 'next' ? '100%' : '-100%', zIndex: 0 }}
          animate={{ x: 0, zIndex: 0 }}
          exit={{ x: direction === 'next' ? '-100%' : '100%', zIndex: 0 }}
          transition={{
            duration: 0.6,
            ease: [.75,-0.01,.14,.99]
          }}
        >
          <Image src={activeImage.url} layout="fill" objectFit="cover" priority placeholder="blur" blurDataURL={activeImage.lqip} />
        </StyledImage>
      </AnimatePresence>
    </Box>
  )
}

export default ProjectListImages