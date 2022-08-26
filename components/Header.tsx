import { Box } from "./box";
import Link from 'next/link';

const Header = () => {
  return (
    <Box as="header" width="100%" display="flex" justifyContent="space-between">
      <Box fontSize="20px" textTransform="uppercase">
        <Link href="/">AG Designs</Link>
      </Box>
      <Box fontSize="16px" textTransform="uppercase">
        <ul>
          <Box as="li" display="inline-block" ml="48px">
            <Link href="/faq">FAQ</Link>
          </Box>
          <Box as="li" display="inline-block" ml="48px">
            <Link href="mailto:anto@agdesigns.com">+ Contact Us</Link>
          </Box>
        </ul>
      </Box>
    </Box>
  )
}

export default Header;