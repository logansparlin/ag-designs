import { useState } from "react";
import { getFAQPage } from "@lib/api";

import { Box } from "@components/box"
import Header from "@components/Header";
import FAQItem from "@components/FAQItem";

const FAQ = ({ pageData }) => {
  const { title, items } = pageData;
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpanded = (key) => {
    if(key === expanded) return setExpanded(null);
    return setExpanded(key);
  }
  return (
    <Box>
      <Box p="32px">
        <Header />
      </Box>
      <Box px="32px" pt="100px">
        <Box as="h1" textTransform="uppercase" fontSize="20px">{title}</Box>
      </Box>
      <Box px="32px" pt="48px">
        {items.map(item => {
          console.log(item)
          return <FAQItem key={item._key} {...item} activeKey={expanded} handleClick={toggleExpanded} currentKey={item._key} />
        })}
      </Box>
    </Box>
  )
}

export async function getStaticProps() {
  const { data: pageData, query } = await getFAQPage();

  return {
    props: {
      pageData,
      query
    },
    revalidate: 10
  };
}

export default FAQ;