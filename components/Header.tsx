import { useAppStore } from "@hooks/useAppStore";
import { motion } from "framer-motion";

import { Box } from "./box";
import Link from 'next/link';

const Header = () => {
  const { setContactOpen, contactOpen } = useAppStore();

  return (
    <Box as="header" position="absolute" width="100%" display="flex" justifyContent="space-between" left="0" top="0" p={["20px", null, "32px"]} zIndex={10}>
      <Box fontSize="20px" textTransform="uppercase">
        <Link href="/">AG Designs</Link>
      </Box>
      <Box fontSize="16px" textTransform="uppercase">
        <ul>
          <Box as="li" display="inline-block" ml="48px">
            <Link href="/faq">FAQ</Link>
          </Box>
          <Box as="li" display="inline-block" ml="48px">
            <Box cursor="pointer" onClick={() => setContactOpen(!contactOpen)}>
              <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: contactOpen ? '45deg' : 0 }}
                style={{ display: 'inline-block', fontSize: '24px', fontWeight: 300, position: 'relative', top: '2px' }}
              >
                +
              </motion.div>
              <Box as="span" pl="2px">Contact Us</Box>
            </Box>
          </Box>
        </ul>
      </Box>
    </Box>
  )
}

export default Header;