import dynamic from 'next/dynamic';
import fetchGraphQL from '../data/fetchContentful';

import type {GetStaticProps} from 'next';

import Page from '../components/Layout/Page';
import Contact from '../components/Sections/Contact';
import Footer from '../components/Sections/Footer';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import Section from '../components/Layout/Section';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../components/Sections/Header'), {ssr: false});

export default function PricingPage(props: any) {
  const faQsContent = props.cmsContent.data.faQs;
  const mainContentRenderd = documentToHtmlString(faQsContent.mainContent.json);

  return (
    <Page>
      <Header />
      <Section className="flex justify-center">
        <div className="prose prose-sm text-gray-300 prose-base">
          <h1 className="text-white">{faQsContent.heading}</h1>
          <div dangerouslySetInnerHTML={{__html: mainContentRenderd}}></div>
        </div>
      </Section>
      <Contact />
      <Footer />
    </Page>
  );
}

export const getStaticProps = (async () => {
  const res = await fetchGraphQL(`{
    faQs(id:"5JJfxMYsKVLTJoBll1YjsD") {
    mainContent {
      json
    }
  }
  }`);

  const cmsContent = await res;
  return {props: {cmsContent}};
}) satisfies GetStaticProps<{
  cmsContent: any;
}>;
