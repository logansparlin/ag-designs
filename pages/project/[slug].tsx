import { getProject, getProjectPaths } from "@lib/api";
import { urlFor } from "@lib/sanity";
import styled from 'styled-components';

import { Box } from "@components/box";
import Header from "@components/Header";
import Image from 'next/image';
import Footer from "@components/Footer";
import Link from 'next/link';

const Divider = () => (
  <Box py="12px">
    <Box width="100%" height="1px" bg="#f2f2f2" />
  </Box>
);

const Label = ({ children }) => (
  <Box textTransform="uppercase" width="150px" fontSize="16px">{children}</Box>
);

const Value = ({ children, withPadding = false }) => (
  <Box 
    fontFamily="SangBleu Republic Trial" 
    fontSize="18px" 
    lineHeight="23px"
    fontStyle="italic"
    fontWeight="100"
    pb={withPadding ? '8px' : '0'}
  >
    {children}
  </Box>
);

const LabelValue = ({ label, value }) => {
  if(Array.isArray(value)) {
    return (
      <Box width="100%" display="flex">
        <Label>{label}</Label>
        <Box>
          {value.map(text => (
            <Value key={text} withPadding>{text}</Value>
          ))}
        </Box>
      </Box>
    )
  }
  return (
    <Box width="100%" display="flex">
      <Label>{label}</Label>
      <Value>{value}</Value>
    </Box>
  )
}

const CloseLink = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 32px;
  font-family: SangBleu Republic Trial;
  font-style: italic;
`;

const Project = ({ pageData }) => {
  const { title, description, images, location, clientType, scope, services } = pageData;
  return (
    <Box>
      <Box position="absolute" width="100%" top="0" left="0" zIndex="100" p={["20px", null, "32px"]}>
        <Header />
        <CloseLink>
          <Link href="/">+ Close Project</Link>
        </CloseLink>
      </Box>
      <Box width="100%" display="flex" height="100vh" as="main" mb="100px" flexWrap="wrap">
        <Box width="50%" position="relative">
          <Image layout="fill" src={urlFor(images[1].image).url()} objectFit="cover" />
        </Box>
        <Box width="50%" p={["20px", null, "32px"]} display="flex" alignItems="flex-end" justifyContent="center">
          <Box width="100%" maxWidth="750px" pb="10%">
            <Box as="h1" fontSize="40px" fontFamily="SangBleu Republic Trial">{title}</Box>
            <Box as="p" fontWeight="300" fontSize="16px" lineHeight="20px" maxWidth="600px" pt="12px" pb="20px">{description}</Box>
            <Box width="100%">
              <Divider />
              <LabelValue label="Location:" value={location} />
              <Divider />
              <LabelValue label="Client Type:" value={clientType} />
              <Divider />
              <LabelValue label="Scope:" value={scope} />
              <Divider />
              <LabelValue label="Resources:" value={services} />
              <Divider />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <Footer /> */}
    </Box>
  )
}

export async function getStaticProps({ params }) {
  const { data: pageData, query } = await getProject(params.slug);

  return {
    props: {
      pageData,
      query
    },
    revalidate: 10
  };
}

export async function getStaticPaths() {
  const { data: paths } = await getProjectPaths();

  return {
    paths,
    fallback: true
  };
}

export default Project;