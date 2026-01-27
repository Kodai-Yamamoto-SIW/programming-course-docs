import type { ComponentType, ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

type PageProps = {
  params: Promise<{
    mdxPath: string[];
  }>;
};

type WrapperProps = {
  toc: unknown;
  metadata: unknown;
  sourceCode: unknown;
  children: ReactNode;
};

export const generateStaticParams = generateStaticParamsFor('mdxPath');

const shouldIgnorePath = (mdxPath: string[] | undefined) => {
  if (!mdxPath || mdxPath.length === 0) {
    return true;
  }

  return mdxPath[0] === '_next';
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  if (shouldIgnorePath(resolvedParams.mdxPath)) {
    notFound();
  }
  const { metadata } = await importPage(resolvedParams.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper as ComponentType<WrapperProps>;

export default async function Page(props: PageProps) {
  const params = await props.params;
  if (shouldIgnorePath(params.mdxPath)) {
    notFound();
  }
  const { default: MDXContent, toc, metadata, sourceCode } =
    await importPage(params.mdxPath);

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
