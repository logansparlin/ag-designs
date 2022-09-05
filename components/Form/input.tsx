import { Box } from "@components/box";

interface InputProps {
  type?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isError?: boolean;
}

export default function Input(props: InputProps) {
  const { isError } = props;

  return (
    <Box
      as="input"
      type="text"
      fontFamily="inherit"
      fontSize="16px"
      fontWeight="400"
      py="8px"
      my="32px"
      display="block"
      width="100%"
      bg="transparent"
      color="white"
      borderRadius="0"
      borderStyle="none"
      borderBottomStyle="solid"
      borderBottomColor={isError ? "error" : "fg"}
      borderBottomWidth={2}
      {...props}
      css={{
        "&:focus": { outline: "none" }
      }}
    />
  )
}
