import React, { FC, memo } from 'react';
import { Helmet } from 'react-helmet';

import { GAME_NAME } from 'constants/commonConstants';

export type Props = {
  title?: string;
  description?: string;
  image?: string;
};

const cutTags = (text = '') => text.replace(/<\/?.+?>/gi, '');

const prepareData = ({ title, description, image }: Props) => ({
  title: cutTags(title),
  description: cutTags(description).substr(0, 250),
  image
});

const PageMeta: FC<Props> = (props: Props) => {
  const { title, description, image } = prepareData(props);

  return (
    <Helmet>
      {title ? (
        <title>{title} - {GAME_NAME}</title>
      ) : (
        <title>{GAME_NAME}</title>
      )}
      <link rel='icon' type='image/png' sizes='192x192'  href='images/favicon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='images/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='images/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='images/favicon-16x16.png' />
      <meta property='og:title' content={title} />
      <meta property='twitter:title' content={title} />
      {description && (
        <>
          <meta name='description' content={description} />
          <meta property='og:description' content={description} />
          <meta property='twitter:description' content={description} />
        </>
      )}
      {image && <meta property='og:image' content={image} />}
    </Helmet>
  );
};

export default memo(PageMeta);
