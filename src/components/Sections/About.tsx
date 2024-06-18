import classNames from 'classnames';
import Image from 'next/image';
import {memo} from 'react';

import {aboutData, SectionId} from '../../data/data';
import Section from '../Layout/Section';
import {BLOCKS} from '@contentful/rich-text-types';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

const About = memo((props: any) => {
  const {profileImageSrc, description, aboutItems} = aboutData;
  console.log(props.content);

  const AboutRender = documentToHtmlString(props?.content?.aboutText, {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, next) => `<h2 class="text-2xl font-bold text-white" >${next(node.content)}</h2>`,
      [BLOCKS.PARAGRAPH]: (node, next) =>
        `<p className="prose prose-sm text-gray-300 sm:prose-base">${next(node.content)}</p>`,
    },
  });

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.About}>
      <div className={classNames('grid grid-cols-1 gap-y-4', {'md:grid-cols-4': !!profileImageSrc})}>
        {!!profileImageSrc && (
          <div className="col-span-1 flex justify-center md:justify-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32">
              <Image alt="about-me-image" className="h-full w-full object-cover" src={profileImageSrc} />
            </div>
          </div>
        )}
        <div className={classNames('col-span-1 flex flex-col gap-y-6', {'md:col-span-3': !!profileImageSrc})}>
          <div
            className="flex flex-col gap-y-2"
            dangerouslySetInnerHTML={{__html: AboutRender}}
            suppressHydrationWarning></div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutItems.map(({label, text, Icon}, idx) => (
              <li className="col-span-1 flex  items-start gap-x-2" key={idx}>
                {Icon && <Icon className="h-5 w-5 text-white" />}
                <span className="text-sm font-bold text-white">{label}:</span>
                <span className=" text-sm text-gray-300">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
