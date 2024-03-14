import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

import {useState, useEffect} from 'react';

// import type {GetStaticProps} from 'next';

import Page from '../../components/Layout/Page';
import Contact from '../../components/Sections/Contact';
import Footer from '../../components/Sections/Footer';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';
import Section from '../../components/Layout/Section';

// eslint-disable-next-line react-memo/require-memo
const Header = dynamic(() => import('../../components/Sections/Header'), {ssr: false});

interface thisPost {
  heading: string;
  subHeading: string;
  mainContent: {
    json: Object | null;
  };
  mainImage: {
    url: string;
  };
}

export default function TreatmentPage(props: any) {
  const [treatmentHeading, setTreatmentHeading] = useState('');
  const [thisPost, setThisPost] = useState<thisPost>({
    heading: '',
    subHeading: '',
    mainContent: {
      json: null,
    },
    mainImage: {
      url: '',
    },
  });
  const [mainContentRenderd, setMainContentRenderd] = useState('<h1>Loading...</h1>');

  const router = useRouter();

  useEffect(() => {
    if (props?.cmsData?.data?.treatmentsCollection) {
      // @ts-ignore
      setTreatmentHeading(router.query?.treatment ? router.query?.treatment.replace(/-/g, ' ') : '');
      setThisPost(
        props?.cmsData?.data?.treatmentsCollection?.items.find(
          (item: any) => item.heading.toLowerCase() === treatmentHeading,
        ),
      );
    }
    if (thisPost)
      // @ts-ignore
      setMainContentRenderd(documentToHtmlString(thisPost?.mainContent?.json));
  });

  // @ts-ignore
  return thisPost ? (
    <Page title={router.query.treatment} description={props?.cmsData?.subheading}>
      <Header />
      <Section className="flex justify-center">
        <div className="prose prose-sm text-gray-300 prose-base">
          <h1 className="text-white">{thisPost.heading}</h1>

          <img src={thisPost?.mainImage?.url} />
          <div dangerouslySetInnerHTML={{__html: mainContentRenderd}}></div>
        </div>
      </Section>
      <Contact />
      <Footer />
    </Page>
  ) : (
    <h1> Loading.... </h1>
  );
}
