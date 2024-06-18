import 'tailwindcss/tailwind.css';
import '../globalStyles.scss';
import fetchGraphQL from '../data/fetchContentful';

import App, {AppProps, AppInitialProps, AppContext} from 'next/app';

type AppOwnProps = {cmsData: any};

export default function MyApp({Component, pageProps, cmsData}: AppProps & AppOwnProps) {
  // console.log({cmsData});

  return (
    <>
      <Component {...pageProps} cmsData={cmsData} />
    </>
  );
}

MyApp.getInitialProps = async (context: AppContext): Promise<AppOwnProps & AppInitialProps> => {
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

    testimonialCollection {
      items {
        clientsName
        clientPhoto {
          url
        }
        mainContent {
          json
        }
      }
    }

    pricing(id:"vhiz8xNkb0vrlaakp2huw") {
      heading
      mainContent {
        json
      }
    }  
    
    welcomAndAbout(id:"6suypqXHQUbSHxLUUqneOh") {
      welcomeHeading1
      welcomeMessage {
        json
      }
      aboutText {
        json
      }

      highlights {
        json
      }
      info
      profilePhoto {
        url 
      }
    }
  }`);
  const ctx = await App.getInitialProps(context);

  return {...ctx, cmsData: data};
};
