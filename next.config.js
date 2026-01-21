import { fileURLToPath } from 'node:url';
import remarkGfm from 'remark-gfm';
import nextra from 'nextra';

const withNextra = nextra({
  defaultShowCopyCode: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config, { isServer }) => {
    const assetCssPattern = /[\\/]content[\\/].*[\\/]assets[\\/].*\.css$/i;
    const staticMediaFilename = 'static/media/[name].[hash][ext]';
    const staticMediaPublicPath = '/_next/';
    const staticMediaOutputPath = isServer ? '..' : undefined;

    config.module.rules.unshift({
      test: assetCssPattern,
      type: 'asset/resource',
      generator: {
        filename: staticMediaFilename,
        publicPath: staticMediaPublicPath,
        outputPath: staticMediaOutputPath,
      },
    });

    const matchesExclude = (exclude, resourcePath) => {
      if (!exclude) return false;
      if (exclude instanceof RegExp) return exclude.test(resourcePath);
      if (typeof exclude === 'function') return exclude(resourcePath);
      return false;
    };

    for (const rule of config.module.rules) {
      if (!rule.oneOf) continue;

      for (const oneOfRule of rule.oneOf) {
        if (!(oneOfRule.test instanceof RegExp)) continue;
        if (!oneOfRule.test.test('test.css')) continue;

        const existingExclude = oneOfRule.exclude;
        oneOfRule.exclude = (resourcePath) => {
          if (assetCssPattern.test(resourcePath)) return true;
          if (!existingExclude) return false;
          if (Array.isArray(existingExclude)) {
            return existingExclude.some((exclude) =>
              matchesExclude(exclude, resourcePath)
            );
          }
          return matchesExclude(existingExclude, resourcePath);
        };
      }
    }

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp|avif|ico|txt|zip|html)$/i,
      type: 'asset/resource',
      generator: {
        filename: staticMediaFilename,
        publicPath: staticMediaPublicPath,
        outputPath: staticMediaOutputPath,
      },
    });

    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
    };
    return config;
  },
};

export default withNextra(nextConfig);
