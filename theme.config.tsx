import React from 'react';
import Link from 'next/link';
import { Footer, Navbar } from 'nextra-theme-docs';
import AdminFooterToggle from './src/components/submissions/admin-footer-toggle';

const config = {
  navbar: (
    <Navbar
      logo={<span>プログラミング演習</span>}
      projectLink="https://github.com/metyatech/programming-course-docs"
    />
  ),
  footer: (
    <Footer>
      <div className="footer-row">
        <p>&copy; {new Date().getFullYear()} さいたまIT・WEB専門学校</p>
        <AdminFooterToggle />
      </div>
    </Footer>
  ),
  docsRepositoryBase:
    'https://github.com/metyatech/programming-course-docs/tree/master',
  editLink: null,
  feedback: {
    content: null,
  },
  navigation: {
    prev: true,
    next: true,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
};

export default config;
