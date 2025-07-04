import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'プログラミング演習',
  tagline: 'HTML・CSSの基礎から実践まで',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://kodai-yamamoto-siw.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/programming-course-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Kodai-Yamamoto-SIW', // Usually your GitHub org/user name.
  projectName: 'programming-course-docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: undefined,
        },
        blog: false, // ブログ機能を無効化
        pages: {
          path: 'src/pages',
          routeBasePath: '/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'プログラミング演習',
      logo: {
        alt: 'プログラミング演習 Logo',
        src: 'img/logo.svg',
      },
      hideOnScroll: false, // スクロール時にナビバーを隠さない
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'mainSidebar',
          position: 'left',
          label: '学習内容',
        },
        {
          href: 'https://github.com/Kodai-Yamamoto-SIW/programming-course-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true, // サイドバーを隠せるようにする
        autoCollapseCategories: false, // カテゴリの自動折りたたみを無効
      },
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '学習コンテンツ',
          items: [
            {
              label: 'HTML基礎',
              to: '/docs/html-basics/introduction',
            },
            {
              label: 'CSS基礎',
              to: '/docs/css-basics/css-introduction',
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} さいたまIT・WEB専門学校`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['markup', 'css', 'javascript'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
