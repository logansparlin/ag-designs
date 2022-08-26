import { useState } from 'react';
import styled from 'styled-components';

import { PortableText } from "@lib/sanity";
import { Box } from "./box";

const Answer = styled(Box)`
  
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
  return (
    <Box fontWeight="300" pb="48px">
      <Question as="button" width="100%" display="flex" justifyContent="space-between" borderTop="1px solid #f2f2f2" py="16px" pb="0" onClick={() => handleClick(currentKey)}>
        <Box as="h2" fontSize="32px" maxWidth="800px" display="flex">
          <Box as="span" pr="14px">Q:</Box>
          {question}
        </Box>
        <Box as="button" fontSize="20px" textTransform="uppercase">{currentKey === activeKey ? 'Collapse' : 'Expand'}</Box>
      </Question>
      {currentKey === activeKey && 
        <Box display="flex" pl="12px" py="12px" pt="32px" maxWidth="800px" fontSize="24px">
          <Box as="span" pr="20px">A:</Box>
          <Answer>
            <PortableText blocks={answer} />
          </Answer>
        </Box>
      }
    </Box>
  )
}

export default FAQItem;