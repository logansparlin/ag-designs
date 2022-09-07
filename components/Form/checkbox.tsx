import styled from 'styled-components';
import { Box } from "@components/box";

interface InputProps {
  name: string;
  value: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const StyledCheckbox = styled.input`
  width: 16px;
  height: 16px;
  margin: 0;
  position: relative;
  vertical-align: middle;
  background: transparent;
  appearance: none;
  border: 1px solid #f2f2f2;
  border-radius: 4px;
  position: relative;

  &:after {
    content: '';
    position: absolute;
    width: 70%;
    height: 70%;
    border-radius: 2px;
    top: 15%;
    left: 15%;
    background: #f2f2f2;
    transform: scale(0);
    transition: transform 150ms ease-in-out;
  }

  &:checked:after {
    transform: scale(1);
    transition: transform 150ms ease-in-out;
  }
`;

export default function Checkbox(props: InputProps) {
  const { name, value } = props;
  const id = `checkbox-${name}[${value}]`;

  return (
    <Box fontSize={["150", null, "200", "300"]} py="10">
      <StyledCheckbox
        id={id}
        type="checkbox"
        {...props}
      />
      <Box as="label" htmlFor={id} pl="25" position="relative" verticalAlign="middle">{value}</Box>
    </Box>
  );
}
