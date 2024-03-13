import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';
import fetchGraphQL from '../data/fetchContentful';

import App, {AppProps, AppInitialProps, AppContext} from 'next/app';
// import {memo} from 'react';

type AppOwnProps = {cmsData: any};

export default function MyApp({Component, pageProps, cmsData}: AppProps & AppOwnProps) {
  console.log({cmsData});

  return (
    <>
      <Component {...pageProps} cmsData={cmsData} />
    </>
  );
}
// const MyApp = memo(({Component, pageProps}: AppProps): JSX.Element => {
//   return (
//     <>
//       <Component {...pageProps} />
//     </>
//   );
// });

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
  // const ctx = await MyApp.getInitialProps(context);
  const data = await fetchGraphQL(`{
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
  const ctx = await App.getInitialProps(context);
  console.log({data});

  return {...ctx, cmsData: data};
};
