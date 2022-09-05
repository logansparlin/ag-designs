import { BsExclamationCircleFill } from "react-icons/bs";
import { Box } from "@components/box";

interface ErrorMessageProps {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <Box fontSize={["14px", null, "16px"]} mt="8px" display="inline-flex" alignItems="center" p="12px 20px" bg="red" borderRadius="8px">
      <Box as="span" verticalAlign="middle" color="white"><BsExclamationCircleFill size="16px" /></Box>
      <Box as="span" pl="8px" color="white" opacity={1}>{message}</Box>
    </Box>
  );
}
