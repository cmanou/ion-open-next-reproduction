/**
 * @param {string} phase
 * @returns {import('next').NextConfig}
 */
const nextConfig = async (phase) => {
  return {
    redirects: () => [
      { source: '/settings', destination: '/settings/general', permanent: false },
    ],
    poweredByHeader: false,
    // Seperate so moon outputs don't conflict when doing caching
    distDir: phase === 'phase-production-build' ? '.next' : '.next-dev',
  };
};

export default nextConfig;
