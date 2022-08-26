import { Box } from "./box";

const Divider = () => (
  <Box px={["20px", null, "32px"]}>
    <Box width="100%" height="1px" bg="#f2f2f2" />
  </Box>
);

const Footer = () => {
  return (
    <Box textAlign="center" width="100%">
      <Divider />
      <Box textTransform="uppercase" fontSize={["16vw", null, "17vw"]} fontWeight="500">AG Designs</Box>
      <Divider />
      <Box p={["20px", null, "32px"]} display="flex" justifyContent="space-between" fontSize={["14px", null, "20px"]}>
        <Box>
          Based in <Box as="span" fontFamily="SangBleuRepublic" fontStyle="italic">New York</Box>
        </Box>
        <Box>&copy; {new Date().getFullYear()} – All Rights Reserved</Box>
      </Box>
    </Box>
  )
}

export default Footer;