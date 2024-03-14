import classNames from 'classnames';
import {FC, memo, useEffect, useState} from 'react';

import {isMobile} from '../../config';
import {SectionId} from '../../data/data';
import {PortfolioItem} from '../../data/dataDef';
import Section from '../Layout/Section';
import Link from 'next/link';

const Portfolio = memo((props: any) => {
  return (
    <Section className="bg-neutral-800" sectionId={SectionId.Portfolio}>
      <div className="flex flex-col gap-y-8">
        <h2 className="self-center text-xl font-bold text-white">Some areas I can help, YOU!</h2>
        <div className=" w-full columns-2 md:columns-3 lg:columns-4">
          {props.content?.items.map((item: any, index: any) => {
            const {heading, mainImage} = item;
            return (
              <div className="pb-6" key={`${heading}-${index}`}>
                <div
                  className={classNames(
                    'relative h-max w-full overflow-hidden rounded-lg shadow-lg shadow-black/30 lg:shadow-xl',
                  )}>
                  <img alt={heading} className="h-full w-full" placeholder="blur" src={mainImage.url} />
                  <ItemOverlay item={item} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
});

Portfolio.displayName = 'Portfolio';
export default Portfolio;

const ItemOverlay: FC<{item: PortfolioItem}> = memo(({item: {heading, subheading}}: any) => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    // Avoid hydration styling errors by setting mobile in useEffect
    if (isMobile) {
      setMobile(true);
    }
  }, []);

  return (
    <Link
      className={classNames(
        'absolute inset-0 w-full  bg-gray-900 transition-all duration-300 opacity-70',
        mobile ? 'h-2/3' : 'h-1/3',
      )}
      href={`/treatments/${heading.toLowerCase().replace(/\s/g, '-')}`}>
      <div className="relative h-full w-full p-4">
        <div className="flex h-full w-full flex-col gap-y-2 overflow-y-auto overscroll-contain">
          <h2 className="text-center font-bold text-white opacity-100">{heading}</h2>
          <p className="text-xs text-white opacity-100 sm:text-sm">{subheading}</p>
        </div>
      </div>
    </Link>
  );
});
