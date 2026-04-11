/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://goprohvacnj.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: '/api/' },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/api/*'],
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
  generateIndexSitemap: false,
  transform: async (config, path) => {
    // Higher priority for key pages
    const highPriority = ['/', '/estimate', '/free-checklist', '/contact']
    const mediumPriority = ['/services', '/locations', '/about', '/faq']

    let priority = config.priority
    if (highPriority.includes(path)) priority = 1.0
    else if (mediumPriority.some((p) => path.startsWith(p))) priority = 0.8

    return {
      loc: path,
      changefreq: config.changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    }
  },
}
