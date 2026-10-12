import config from '~/config.json';

const { name, url } = config;
export const siteUrl = url.replace(/\/+$/, '');
const defaultOgImage = `${siteUrl}/social-image.png`;
const defaultOgImageAlt = `${name} — Full-Stack Developer portfolio`;
const defaultTwitterHandle = '@hanumanraj_07';
const defaultKeywords =
  'Hanuman Rajpurohit, Hanuman Singh Rajpurohit, portfolio, full-stack developer, MERN stack developer, React developer, JavaScript, Node.js, MongoDB, web developer India';

/**
 * Build the canonical URL for a pathname, e.g. `/projects/` -> `https://site/projects`
 */
export function getCanonicalUrl(pathname = '/') {
  const normalizedPath = pathname === '/' ? '' : pathname.replace(/\/+$/, '');
  return `${siteUrl}${normalizedPath}`;
}

export function baseMeta({
  title,
  description,
  prefix = name,
  ogImage = defaultOgImage,
  ogImageAlt = defaultOgImageAlt,
  ogType = 'website',
  twitterHandle = defaultTwitterHandle,
  keywords = defaultKeywords,
  noIndex = false,
}) {
  const titleText = [prefix, title].filter(Boolean).join(' | ');

  // `canonical` and `og:url` are rendered per-request in root.jsx
  return [
    { title: titleText },
    { name: 'description', content: description },
    { name: 'author', content: name },
    { name: 'keywords', content: keywords },
    {
      name: 'robots',
      content: noIndex
        ? 'noindex, follow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    },
    { property: 'og:image', content: ogImage },
    { property: 'og:image:alt', content: ogImageAlt },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:type', content: 'image/png' },
    { property: 'og:title', content: titleText },
    { property: 'og:site_name', content: `${name} Portfolio` },
    { property: 'og:type', content: ogType },
    { property: 'og:locale', content: 'en_US' },
    { property: 'og:description', content: description },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: titleText },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: ogImage },
    { name: 'twitter:image:alt', content: ogImageAlt },
    { name: 'twitter:site', content: twitterHandle },
    { name: 'twitter:creator', content: twitterHandle },
  ];
}
