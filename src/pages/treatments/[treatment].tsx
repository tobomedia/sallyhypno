import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';
import fetchGraphQL from '../../data/fetchContentful';

import type {GetStaticProps} from 'next';

import Page from '../../components/Layout/Page';
import Contact from '../../components/Sections/Contact';
import Footer from '../../components/Sections/Footer';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import Section from '../../components/Layout/Section';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../../components/Sections/Header'), {ssr: false});

export default function TreatmentPage(props: any) {
  const router = useRouter();
  if (router.isFallback) {
    return null;
  }

  const treatmentHeading = router.query?.treatment.replace(/-/g, ' ');
  const thisPost = props.cmsContent.data.treatmentsCollection.items.find(
    (item: any) => item.heading.toLowerCase() === treatmentHeading,
  );
  const mainContentRenderd = documentToHtmlString(thisPost.mainContent.json);

  return (
    <Page title={router.query.treatment} description={props?.cmsContent?.subheading}>
      <Header />
      <Section className="flex justify-center">
        <div className="prose prose-sm text-gray-300 prose-base">
          <h1 className="text-white">{thisPost.heading}</h1>
          <img src={thisPost.mainImage.url} />
          <div dangerouslySetInnerHTML={{__html: mainContentRenderd}}></div>
        </div>
      </Section>
      <Contact />
      <Footer />
    </Page>
  );
}
/* <div dangerouslySetInnerHTML={documentToHtmlString(thisPost.mainContent.json)} /> */
export async function getStaticPaths() {
  return {
    paths: [],
    fallback: false,
  };
}

export const getStaticProps = (async () => {
  const res = await fetchGraphQL(`{
    treatmentsCollection {
      items {
        heading
        subheading
        mainImage {
          url
        }
        mainContent {
          json
          
        }
      }
    }
  }`);

  const cmsContent = await res;
  return {props: {cmsContent}};
}) satisfies GetStaticProps<{
  cmsContent: any;
}>;
