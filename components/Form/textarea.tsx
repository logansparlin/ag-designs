import { Box } from "@components/box";

interface TextareaProps {
  name: string;
  rows?: number;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Textarea(props: TextareaProps) {

  return (
    <Box
      as="textarea"
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
      borderBottomColor="fg"
      borderBottomWidth={2}
      {...props}
      rows="4"
      css={{
        "&:focus": { outline: "none" },
        "resize": "none"
      }}
    />
  )
}
