module.exports = {
  title: 'ferhat elmas',
  tagline: 'passionate developer',
  url: 'https://ferhatelmas.com',
  baseUrl: '/',
  projectName: 'ferhatelmas.com',
  organizationName: 'ferhatelmas',

  headerLinks: [
    { search: true },
    { doc: 'index', label: 'Knowledge Base' },
    { blog: true, label: 'Blog' },
    { href: 'https://github.com/ferhatelmas', label: 'GitHub' }
  ],

  headerIcon: 'img/favicon.ico',
  footerIcon: 'img/favicon.ico',
  favicon: 'img/favicon.ico',

  colors: {
    primaryColor: '#595338',
    secondaryColor: '#3e3a27'
  },

  copyright: `Copyright © ${new Date().getFullYear()} ferhat elmas`,

  highlight: {
    theme: 'default'
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ['https://buttons.github.io/buttons.js'],

  onPageNav: 'separate',
  cleanUrl: true,
  docsSideNavCollapsible: true,
  enableUpdateBy: true,
  enableUpdateTime: true,
  cname: 'ferhatelmas.com',
  scrollToTop: true,
  repoUrl: 'https://github.com/ferhatelmas/ferhatelmas.com',
  algolia: {
    apiKey: 'my-api-key',
    indexName: 'my-index-name'
  }
}
