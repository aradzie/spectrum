export type Meta = Readonly<{
  titles: ReadonlyArray<MetaTitle>;
  descriptions: ReadonlyArray<MetaDescription>;
}>;

export type MetaTitle = Readonly<{
  title: string;
}>;

export type MetaDescription = Readonly<{
  description: string;
}>;
