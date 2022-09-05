import { Box } from "@components/box";
import { useAppStore } from '@hooks/useAppStore';


interface InputProps {
  text?: string;
  withCancel?: boolean;
}

export default function Submit(props: InputProps) {
  const { text, withCancel = false } = props;

  return (
    <Box display="flex" justifyContent={["flex-start", null, "flex-end"]}>
      {withCancel && <Box
        as="button"
        type="button"
        fontSize={["200", null, "300"]}
        p="25"
        pr="0"
        mt="100"
        display="block"
        width="auto"
        bg="transparent"
        fontWeight="bold"
        color="white"
        textAlign="right"
        borderStyle="none"
        css={{ cursor: "pointer" }}
        opacity="0.8"
        mr="100"
      >
        <Box as="span" textTransform="uppercase" mr="25">Cancel</Box>
      </Box>}
      <Box
        as="button"
        type="submit"
        fontSize={["200", null, "300"]}
        p="25"
        pr="0"
        mt="100"
        display="block"
        width="auto"
        bg="transparent"
        fontWeight="bold"
        color="white"
        textAlign="right"
        borderStyle="none"
        {...props}
        css={{ cursor: "pointer" }}
      >
        <Box as="span" mr="25">{text}</Box>
      </Box>
    </Box>
  );
}
