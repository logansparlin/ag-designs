import { getProject, getProjectPaths } from "@lib/api";
import { urlFor } from "@lib/sanity";
import styled from 'styled-components';
import { getImageDimensions } from '@sanity/asset-utils';

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
  if(!pageData) return <div>No Page Data</div>;
  const { title, description, images, location, clientType, scope, services } = pageData;
  return (
    <Box>
      <Box position="absolute" width="100%" top="0" left="0" zIndex="100" p={["20px", null, "32px"]}>
        <Header />
        <CloseLink>
          <Link href="/">+ Close Project</Link>
        </CloseLink>
      </Box>
      <Box width="100%" display="flex" height={["auto", null, "100vh"]} as="main" mb="100px" flexWrap="wrap">
        <Box 
          width={["100%", null, "50%"]} 
          position="relative" 
          height={["auto", null, "100%"]} 
          overflow="scroll" 
          style={{ whiteSpace: 'nowrap', scrollSnapType: 'x mandatory'}}>
          {images.map(image => {
            const url = urlFor(image.image).auto('format').url();
            const lqip = image.metadata.lqip;
            const dimensions = getImageDimensions(image.image);
            return (
              <Box 
                display={["inline-block", null, "block"]} 
                width="100%" height="0" 
                pb={["80%", null, `${100 * (dimensions.height / dimensions.width)}%`]} 
                position="relative" 
                style={{ willChange: 'auto', scrollSnapAlign: 'start' }}
              >
                <Image layout="fill" src={url} objectFit="cover" placeholder="blur" blurDataURL={lqip} />
              </Box>
            )
          })}
        </Box>
        <Box width={["100%", null, "50%"]} p={["20px", null, "32px"]} display="flex" alignItems="flex-end" justifyContent="center" pt={["48px", null, "32px"]}>
          <Box width="100%" maxWidth="750px" pb="48px">
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
              <LabelValue label="Services:" value={services} />
              <Divider />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display={["block", null, "none"]}>
        <Footer />
      </Box>
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