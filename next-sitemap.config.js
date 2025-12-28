/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://haritachalaorganics.org',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/api/*', '/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://haritachalaorganics.org/server-sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Custom priority and changefreq for specific pages
    const customConfig = {
      '/': { priority: 1.0, changefreq: 'daily' },
      '/product': { priority: 0.9, changefreq: 'weekly' },
      '/order': { priority: 0.9, changefreq: 'weekly' },
      '/about': { priority: 0.8, changefreq: 'monthly' },
      '/faq': { priority: 0.7, changefreq: 'monthly' },
      '/inside_scoop': { priority: 0.7, changefreq: 'weekly' },
    };

    // Product detail pages get higher priority
    if (path.startsWith('/product/') && path !== '/product') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.85,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    // Apply custom config or use defaults
    const custom = customConfig[path];
    if (custom) {
      return {
        loc: path,
        changefreq: custom.changefreq,
        priority: custom.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }

    // Default transformation
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
