const STATIC_ASSET_EXTENSIONS = new Set([
  'apng',
  'avif',
  'bmp',
  'gif',
  'ico',
  'jpeg',
  'jpg',
  'png',
  'svg',
  'tif',
  'tiff',
  'webp',
]);

const isStaticAssetLike = (segment: string) => {
  const dotIndex = segment.lastIndexOf('.');
  if (dotIndex <= 0) {
    return false;
  }

  const extension = segment.slice(dotIndex + 1).toLowerCase();
  return STATIC_ASSET_EXTENSIONS.has(extension);
};

export const shouldIgnoreMdxPath = (mdxPath: string[] | undefined) => {
  if (!mdxPath || mdxPath.length === 0) {
    return true;
  }

  if (mdxPath[0] === '_next') {
    return true;
  }

  return isStaticAssetLike(mdxPath[mdxPath.length - 1] ?? '');
};

