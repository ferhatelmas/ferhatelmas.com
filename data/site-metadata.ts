export const SITE_METADATA = {
  title: `Ferhat's rabbit hole – art, design, economy, philosophy and technology`,
  author: 'Ferhat Elmas',
  headerTitle: `Ferhat's rabbit hole`,
  description:
    'Where I document my evolution and share insights, lessons, and resources that matter.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://ferhatelmas.com',
  siteRepo: 'https://github.com/ferhatelmas/ferhatelmas.com',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/me.jpg`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.jpeg`,
  email: 'contact@ferhatelmas.com',
  github: 'https://github.com/ferhatelmas',
  x: 'https://x.com/ferhatelmas_',
  linkedin: 'https://www.linkedin.com/in/ferhatelmas',
  goodreads: 'https://www.goodreads.com/review/list/24238914-ferhat-elmas',
  strava: 'https://www.strava.com/athletes/2921015',
  locale: 'en-US',
  stickyNav: true,
  search: {
    kbarConfigs: {
      // path to load documents to search
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
  resume: 'https://ferhatelmas.github.io/resume/ferhat-elmas-resume.pdf',
  support: {
    buyMeACoffee: 'https://coff.ee/ferhatelmas',
  },
}
