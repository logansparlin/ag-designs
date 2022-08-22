import { Box } from "./box";

const Header = () => {
  return (
    <Box as="header" width="100%" display="flex" justifyContent="space-between">
      <Box fontSize="20px" textTransform="uppercase">AG Designs</Box>
      <Box fontSize="16px">
        <ul>
          <Box as="li" display="inline-block" ml="48px">FAQ</Box>
          <Box as="li" display="inline-block" ml="48px">+ Contact Us</Box>
        </ul>
      </Box>
    </Box>
  )
}

export default Header;