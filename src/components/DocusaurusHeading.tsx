import type { ComponentPropsWithoutRef, ElementType, ReactElement } from 'react';

type HeadingProps<T extends ElementType = 'h2'> = {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as'>;

export default function DocusaurusHeading<T extends ElementType = 'h2'>(
  props: HeadingProps<T>
): ReactElement {
  const { as, ...rest } = props;
  const Tag = (as ?? 'h2') as ElementType;
  return <Tag {...rest} />;
}
