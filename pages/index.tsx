import Head from 'next/head'
import { getHomePage } from '@lib/api';
import { PortableText, urlFor } from '@lib/sanity';

import { Box } from '@components/box';
import ProjectList from '@components/ProjectList';
import Footer from '@components/Footer';
import Header from '@components/Header';
import { ContactOverlay } from '@components/Contact/ContactOverlay';

const HomeHead = () => (
  <Head>
    <title>AG Designs</title>
    <meta name="description" content="AG Designs" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Home = ({ data }): JSX.Element => {
  const { pageData = {} } = data;

  if (!pageData) {
    return (
      <div>
        <HomeHead />
        No Page Data Available. Make sure you create a Home Page in Sanity Studio.
      </div>
    )
  }

  const { title, projects, process, services } = pageData;

  return (
    <Box>
      <Box p={["20px", null, "32px"]} as="main">
        <HomeHead />
        <ContactOverlay />
        <Header />
        <Box as="h1" fontSize={["32px", null, "64px"]} lineHeight={["38px", null, "68px"]} pt={["80px", null, "100px"]} fontWeight="400" maxWidth="800px">{title}</Box>
        <ProjectList projects={projects} />
        <Box display="flex" justifyContent="space-between" pb="100px" flexWrap="wrap" pt={["40px", null, "0"]}>
          <Box width={["100%", null, "48%"]}>
            <Box
              as="h2"
              fontSize={["24px", null, "28px"]}
              fontWeight="400"
              lineHeight="40px"
              pb={["24px", null, "40px"]}
              textTransform="uppercase"
            >
              Our Design Process
            </Box>
            <Box as="ul">
              {process.map((item, index) => {
                return (
                  <Box as="li" display="flex" key={`${item}-${index}`} pb="24px">
                    <Box width="24px" height="24px" border="1px solid #f2f2f2" borderRadius="100px" display="flex" alignItems="center" justifyContent="center">
                      <Box as="span">{`${index + 1}`}</Box>
                    </Box>
                    <Box
                      flex="1"
                      fontSize={["20px", null, "24px"]}
                      fontWeight="300"
                      lineHeight={["24px", null, "28px"]}
                      pl="12px"
                      maxWidth={["100%", null, "400px"]}
                    >
                      {item}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
          <Box width={["100%", null, "48%"]} pt={["40px", null, "0"]}>
            <Box
              as="h2"
              fontSize={["24px", null, "28px"]}
              fontWeight="400"
              lineHeight="40px"
              pb={["24px", null, "40px"]}
              textTransform="uppercase"
            >
              Our Services
            </Box>
            <Box as="ul">
              {services.map((item, index) => {
                return (
                  <Box as="li" key={`${item}-${index}`} display="flex" alignItems="center" pb="8px">
                    <Box>&mdash;</Box>
                    <Box
                      key={`${item}-${index}`}
                      as="span"
                      fontSize={["20px", null, "24px"]}
                      fontWeight="300"
                      lineHeight={["24px", null, "28px"]}
                      pl="12px"
                    >
                      {item}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}

export async function getStaticProps() {
  const { data: pageData, query } = await getHomePage();

  return {
    props: {
      data: {
        pageData,
        query
      }
    },
    revalidate: 1
  }
}

export default Home;
