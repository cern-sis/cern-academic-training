export const pluralizeUnlessSingle = (singularWord: string, count: number) =>
  count !== 1 ? `${singularWord}s` : singularWord;
