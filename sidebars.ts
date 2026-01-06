import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

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
    'intro/index',
    {
      type: 'category',
      label: '📚 HTML基礎',
      collapsed: true,
      items: [
        'html-basics/introduction/index',
        'html-basics/structure/index',
        'html-basics/elements/index',
        'html-basics/text-markup/index',
        'html-basics/images-links/index',
        {
          type: 'category',
          label: '💪 実践演習',
          collapsed: true,
          items: [
            'html-basics/markup-exercises/index',
            'html-basics/markup-exercises-advanced/index',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🎨 CSS基礎',
      collapsed: true,
      items: [
        'css-basics/css-introduction/index',
        'css-basics/css-units/index',
        'css-basics/css-styling-basics/index',
        'css-basics/box-model/index',
        'css-basics/text-typography/index',
        'css-basics/advanced-styling/index',
        'css-basics/pseudo-classes/index',
        'css-basics/css-animations/index',
        'css-basics/css-selectors/index',
        'css-basics/backgrounds/index',
        'css-basics/shorthand-properties/index',
        'css-basics/decorative-effects/index',
        'css-basics/positioning/index',
        'css-basics/negative-margin/index',
        'css-basics/display/index',
        'css-basics/flexbox/index',
        'css-basics/flexbox-advanced/index',
        'css-basics/layout-summary-exercises/index',
      ],
    },
    'reference/index',
  ],
};

export default sidebars;
