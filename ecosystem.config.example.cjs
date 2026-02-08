module.exports = {
  apps: [
    {
      name: 'codenova-web',
      script: './.output/server/index.mjs',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        NITRO_PORT: 4000,
        GITHUB_USERNAME: 'donzeg',
        GITHUB_TOKEN: '', // Add your GitHub token here
        CONTACT_EMAIL: 'codenovainnovations@gmail.com',
        RESEND_API_KEY: '', // Add your Resend API key here
        NUXT_PUBLIC_SITE_URL: 'http://217.117.2.101/codenova-web'
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G'
    }
  ]
}
