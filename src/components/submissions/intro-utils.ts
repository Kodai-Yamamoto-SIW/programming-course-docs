export const normalizeIntroInput = (value: string): string | null => {
  const normalized = value.replace(/\r\n/g, '\n').trim();
  return normalized.length > 0 ? normalized : null;
};
