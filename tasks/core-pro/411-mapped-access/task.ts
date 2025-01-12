type PagesMap = {
  homepage: string;
  about: string;
  contact: string;
};

type PagesAccess = {
  [Props in keyof PagesMap]: boolean;
};

export function checkAccess(map: PagesMap): PagesAccess {
  return Object.keys(map).reduce((acc, key) => ({ ...acc, [key]: true }), {} as PagesAccess);
}
