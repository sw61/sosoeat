import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/mypage', '/sosotalk/write', '/oauth/'],
      },
    ],
    sitemap: 'https://sosoeat.com/sitemap.xml',
  };
}
