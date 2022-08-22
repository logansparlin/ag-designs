import Head from 'next/head'
import { getHomePage } from '@lib/api';
import { PortableText, urlFor } from '@lib/sanity';

import { Box } from '@components/box';
import ProjectList from '@components/ProjectList';
import Footer from '@components/Footer';
import Header from '@components/Header';

const HomeHead = () => (
  <Head>
    <title>AG Designs</title>
    <meta name="description" content="AG Designs" />
    <link rel="icon" href="/favicon.ico" />
  </Head>
)

const Home = ({ data }): JSX.Element => {
  const { pageData = {} } = data;

  if(!pageData) {
    return (
      <div>
        <HomeHead />
        No Page Data Available. Make sure you create a Home Page in Sanity Studio.
      </div>
    )
  }

  const { title, projects, } = pageData;
  console.log(pageData)
  
  return (
    <Box>
      <Box p={["20px", null, "32px"]}  as="main">
        <HomeHead />
        <Header />
        <Box as="h1" fontSize={["32px", null, "64px"]} lineHeight={["38px", null, "68px"]} pt={["48px", null, "100px"]} fontWeight="500" maxWidth="780px">{title}</Box>
        <ProjectList projects={projects} />
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
