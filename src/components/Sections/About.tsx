import classNames from 'classnames';
import {memo} from 'react';

import {SectionId} from '../../data/data';
import Section from '../Layout/Section';
import {BLOCKS} from '@contentful/rich-text-types';
import {documentToHtmlString} from '@contentful/rich-text-html-renderer';

const About = memo((props: any) => {
  console.log(props.content);

  const AboutRender = documentToHtmlString(props?.content?.aboutText.json, {
    renderNode: {
      [BLOCKS.HEADING_2]: (node, next) => `<h2 class="text-2xl font-bold text-white" >${next(node.content)}</h2>`,
      [BLOCKS.PARAGRAPH]: (node, next) =>
        `<p className="prose prose-sm text-gray-300 sm:prose-base">${next(node.content)}</p>`,
    },
  });

  const HighlightsRender = documentToHtmlString(props?.content?.highlights.json, {
    renderNode: {
      [BLOCKS.UL_LIST]: (node, next) =>
        `<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 text-white">${next(node.content)}</ul>`,
      [BLOCKS.LIST_ITEM]: (node, next) =>
        `<li class="col-span-1 flex  items-start gap-x-2 text-white">${next(node.content)}</li>`,
    },
  });

  return (
    <Section className="bg-neutral-800" sectionId={SectionId.About}>
      <div className={classNames('grid grid-cols-1 gap-y-4', {'md:grid-cols-4': !!props?.content?.profilePhoto})}>
        {!!props?.content?.profilePhoto && (
          <div className="col-span-1 flex justify-center md:justify-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-xl md:h-32 md:w-32">
              <img alt="about-me-image" className="h-full w-full object-cover" src={props?.content?.profilePhoto.url} />
            </div>
          </div>
        )}
        <div
          className={classNames('col-span-1 flex flex-col gap-y-6', {'md:col-span-3': !!props?.content?.profilePhoto})}>
          <div
            className="flex flex-col gap-y-2 text-white"
            dangerouslySetInnerHTML={{__html: AboutRender}}
            suppressHydrationWarning></div>
          <div dangerouslySetInnerHTML={{__html: HighlightsRender}}></div>
        </div>
      </div>
    </Section>
  );
});

About.displayName = 'About';
export default About;
