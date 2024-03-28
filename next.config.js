const { withSentryConfig } = require('@sentry/nextjs')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MAINNET_PRIMARY: process.env.MAINNET_PRIMARY,
    MAINNET_SECONDARY: process.env.MAINNET_SECONDARY,
    GEO_LOCATION_API_KEY: process.env.GEO_LOCATION_API_KEY,
    BASE_CLUSTER: process.env.BASE_CLUSTER,
    BYPASS_REGION_CHECK: process.env.BYPASS_REGION_CHECK,
  },
  images: {
    domains: ['i.imgur.com'],
  },
}

module.exports =
  process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
    ? withSentryConfig(nextConfig, {
        // Additional config options for the Sentry Webpack plugin (from old config)
        silent: true, // Suppresses all logs
        dryRun: process.env.VERCEL_ENV !== 'production',

        // Sentry-specific options (from auto-generated config)
        org: 'brainrex',
        project: 'javascript-nextjs',
        widenClientFileUpload: true,
        transpileClientSDK: true,
        tunnelRoute: '/monitoring',
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
      })
    : nextConfig
