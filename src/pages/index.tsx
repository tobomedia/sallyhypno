import dynamic from 'next/dynamic';
import {FC, memo} from 'react';

import Page from '../components/Layout/Page';
import About from '../components/Sections/About';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';
import Hero from '../components/Sections/Hero';
import Portfolio from '../components/Sections/Portfolio';
import Testimonials from '../components/Sections/Testimonials';
import {homePageMeta} from '../data/data';
// import fetchGraphQL from '../data/fetchContentful';

// import type {GetStaticProps} from 'next';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

const Home: FC = memo((props: any) => {
  const {title, description} = homePageMeta;
  console.table(props);

  const {cmsData} = props;

  return (
    <Page description={description} title={title}>
      <Header />
      <Hero />
      <About />
      <Portfolio content={cmsData.data.treatmentsCollection} />
      <Testimonials />
      <Contact />
      <Footer />
    </Page>
  );
});

// export const getStaticProps = (async () => {
//   const res = await fetchGraphQL(`{
//     treatmentsCollection {
//       items {
//         heading
//         subheading
//         mainImage {
//           url
//         }
//         mainContent {
//           json

//         }
//       }
//     }

//   }`);
//   console.table(res);

//   const cmsContent = await res;
//   return {props: {cmsContent}};
// }) satisfies GetStaticProps<{
//   cmsContent: any;
// }>;

export default Home;
