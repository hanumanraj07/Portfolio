import config from '~/config.json';

const { name, url } = config;
const siteUrl = url.replace(/\/+$/, '');
const defaultOgImage = `${siteUrl}/social-image.png`;
const defaultTwitterHandle = '@hanumanraj_07';

export function baseMeta({
  title,
  description,
  prefix = name,
  ogImage = defaultOgImage,
  pageUrl = siteUrl,
  twitterHandle = defaultTwitterHandle,
  keywords,
}) {
  const titleText = [prefix, title].filter(Boolean).join(' | ');

  const metaTags = [
    { title: titleText },
    { name: 'description', content: description },
    { name: 'author', content: name },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: 'Banner for the site' },
    { property: 'og:image:width', content: '1280' },
    { property: 'og:image:height', content: '800' },
    { property: 'og:title', content: titleText },
    { property: 'og:site_name', content: name },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: pageUrl },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: titleText },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: 'Banner for the site' },
    { name: 'twitter:site', content: twitterHandle },
    { name: 'twitter:creator', content: twitterHandle },
    {
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
  ];

  if (keywords) {
    metaTags.push({ name: 'keywords', content: keywords });
  }

  return metaTags;
}
