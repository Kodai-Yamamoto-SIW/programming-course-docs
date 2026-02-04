import React from 'react';
import { createCourseThemeConfig } from '@metyatech/course-docs-platform/nextra';
import AdminFooterToggle from './src/components/submissions/admin-footer-toggle';

export default createCourseThemeConfig({
  logo: <span>プログラミング演習</span>,
  projectLink: 'https://github.com/metyatech/programming-course-docs',
  docsRepositoryBase:
    'https://github.com/metyatech/programming-course-docs/tree/master',
  footerRight: <AdminFooterToggle />,
});
