import { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { PortableText } from "@lib/sanity";
import { Box } from "./box";

const Answer = styled(motion(Box))`
  position: relative;
`;

const Question = styled(Box)`
  appearance: none;
  border-left: none;
  border-right: none;
  border-bottom: none;
  outline: none;
  border-radius: 0px;
  background: transparent;
  color: #f2f2f2;
  display: flex;
  text-align: left;
  cursor: pointer;

  button {
    appearance: none;
    border: none;
    outline: none;
    border-radius: 0px;
    background: transparent;
    margin: 0;
    padding: 0;
    color: #f2f2f2;
    opacity: 0;
    transition: opacity 150ms ease-in-out;
  }

  &:hover, &:active {
    button {
      opacity: 0.5;
      transition: opacity 150ms ease-in-out;
    }
  }
`;


const FAQItem = ({ question, answer, activeKey, handleClick, currentKey }) => {
  const answerRef = useRef(null);

  return (
    <Box fontWeight="300" pb="48px">
      <Question as="button" width="100%" display="flex" justifyContent="space-between" borderTop="1px solid #f2f2f2" py="16px" pb="0" onClick={() => handleClick(currentKey)}>
        <Box as="h2" fontSize={["20px", null, "32px"]} maxWidth="800px" display="flex">
          <Box as="span" pr="14px">Q:</Box>
          {question}
        </Box>
        <Box display={["none", null, "block"]} fontSize="20px" textTransform="uppercase">{currentKey === activeKey ? 'Collapse' : 'Expand'}</Box>
      </Question>
      <Answer
        height="0"
        overflow="hidden"
        initial={{ height: 0 }}
        animate={{ height: currentKey === activeKey ? answerRef.current.scrollHeight : 0 }}
        transition={{
          duration: 0.5
        }}
      >
        <Box
          ref={answerRef}
          display="flex"
          pl={["8px", null, "12px"]}
          py="12px"
          pt="32px"
          maxWidth="800px"
          fontSize={["16px", null, "24px"]}
        >
          <Box as="span" pr={["16px", null, "20px"]}>A:</Box>
          <Box>
            <PortableText blocks={answer} />
          </Box>
        </Box>
      </Answer>
    </Box>
  )
}

export default FAQItem;