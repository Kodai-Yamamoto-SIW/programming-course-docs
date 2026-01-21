import type { MDXComponents } from 'nextra/mdx-components';
import { CodePreview } from '@metyatech/code-preview/server';
import Exercise, { Solution } from '@metyatech/exercise/client';
import { useMDXComponents as getThemeComponents } from 'nextra-theme-docs';

export function useMDXComponents(
  components: MDXComponents = {}
): MDXComponents {
  return getThemeComponents({
    ...components,
    CodePreview,
    Exercise,
    Solution,
  });
}
