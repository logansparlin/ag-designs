import { getProject, getProjectPaths } from "@lib/api";
import { urlFor } from "@lib/sanity";

import { Box } from "@components/box";
import Image from 'next/image';

const Divider = () => (
  <Box py="12px">
    <Box width="100%" height="1px" bg="#f2f2f2" />
  </Box>
);

const Label = ({ children }) => (
  <Box textTransform="uppercase" width="200px" fontSize="16px">{children}</Box>
);

const Value = ({ children }) => (
  <Box fontFamily="SangBleu Republic Trial" fontSize="18px" fontStyle="italic">{children}</Box>
);

const LabelValue = ({ label, value }) => (
  <Box width="100%" display="flex">
    <Label>{label}</Label>
    <Value>{value}</Value>
  </Box>
)

const Project = ({ pageData }) => {
  const { title, description, images, location, clientType, scope, services } = pageData;
  return (
    <Box width="100%" display="flex" height="100vh">
      <Box flex="1" position="relative">
        <Image layout="fill" src={urlFor(images[1].image).url()} objectFit="cover" />
      </Box>
      <Box flex="1" p={["20px", null, "32px"]} display="flex" alignItems="flex-end" justifyContent="center">
        <Box width="100%" maxWidth="750px" pb="10%">
          <Box as="h1" fontSize="40px" fontFamily="SangBleu Republic Trial">{title}</Box>
          <Box as="p" fontWeight="300" fontSize="16px" lineHeight="20px" maxWidth="600px" pt="12px" pb="20px">{description}</Box>
          <Box width="100%">
            <Divider />
            <LabelValue label="Location:" value={location} />
            <Divider />
            <LabelValue label="Client Type:" value={clientType} />
            <Divider />
          </Box>
        </Box>
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