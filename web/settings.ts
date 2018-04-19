export const settings:any = {
  whitelabel: true,
  company: 'NASA',
  logo: '/assets/logo.png',
  web_host: 'https://app.datafire.io',
  api_host: 'http://34.215.112.247:3001',
  github_username: 'lucybot-v3-access',
  callback_url: 'https://api.datafire.io/oauth/provider/callback',
  refresh_url: 'https://api.datafire.io/oauth/provider/refresh',
  integrations: ['github', 'bitbucket', 'circleci', 'slack', 'appveyor', 'gitlab', 'runscope', 'mongodb', 'hacker_news', 'reddit_rss'],
  client_ids: {
    github: 'your_github_client_id',
    reddit: {
      clientID: 'your_reddit_client_id',
      authorizationURL: 'https://ssl.reddit.com/api/v1/authorize',
      tokenURL: 'https://www.reddit.com/api/v1/access_token',
      duration: 'permanent',
    },
  },
}
