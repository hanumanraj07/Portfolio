import { json } from '@remix-run/node';
import { useRouteError } from '@remix-run/react';
import { Error } from '~/layouts/error';
import config from '~/config.json';
import { baseMeta, getCanonicalUrl, siteUrl } from '~/utils/meta';
import {
  getProject,
  getProjectMedia,
  getSourceLink,
  projectPath,
} from '~/routes/home/project-data';

export async function loader({ params }) {
  const project = getProject(params.slug);

  if (!project) {
    throw new Response(null, { status: 404, statusText: 'Not found' });
  }

  return json({ slug: project.slug });
}

export function meta({ data }) {
  const project = data && getProject(data.slug);

  if (!project) {
    return [{ title: '404 | Page not found' }, { name: 'robots', content: 'noindex, follow' }];
  }

  // Without a cover yet, the page falls back to the site's default share image
  const { cover } = getProjectMedia(project);
  const ogImage = cover ? `${siteUrl}${cover.src}` : undefined;
  const source = getSourceLink(project);
  const pageUrl = getCanonicalUrl(projectPath(project));
  const technologies = project.stack.flatMap(group => group.items);

  return [
    ...baseMeta({
      title: project.shortTitle,
      description: project.description,
      ogImage,
      ogImageAlt: cover?.alt,
      keywords: [project.shortTitle, project.type, ...technologies, config.name].join(', '),
    }),
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'SoftwareSourceCode',
            name: project.title,
            description: project.description,
            url: pageUrl,
            ...(source && { codeRepository: source }),
            ...(ogImage && { image: ogImage }),
            keywords: technologies.join(', '),
            author: { '@id': `${siteUrl}#person` },
            ...(project.liveLink && { targetProduct: { '@type': 'WebApplication', url: project.liveLink } }),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
              { '@type': 'ListItem', position: 2, name: 'Projects', item: `${siteUrl}/projects` },
              { '@type': 'ListItem', position: 3, name: project.shortTitle, item: pageUrl },
            ],
          },
        ],
      },
    },
  ];
}

export function ErrorBoundary() {
  const error = useRouteError();

  return <Error error={error} />;
}

export { ProjectPage as default } from './project-page';
