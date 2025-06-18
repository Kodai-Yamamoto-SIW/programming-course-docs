import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  mainSidebar: [
    'intro',
    {
      type: 'category',
      label: '📚 HTML基礎',
      collapsed: false,
      items: [
        'html-basics/introduction',
        'html-basics/structure',
        'html-basics/elements',
        'html-basics/text-markup',
        'html-basics/images-links',
        {
          type: 'category',
          label: '💪 実践演習',
          collapsed: false,
          items: [
            'html-basics/markup-exercises',
            'html-basics/markup-exercises-advanced',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🎨 CSS基礎',
      collapsed: false,
      items: [
        'css-basics/css-introduction',
      ],
    },
  ],
};

export default sidebars;
