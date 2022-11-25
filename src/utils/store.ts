import _ from 'lodash';

export const store = {
  query: <T>(type: string, belongTo?: string) => {
    const prefix = belongTo ? `${type}-${belongTo}` : type;
    const result = _.keys(localStorage)
      .filter((k) => k.startsWith(`${prefix}-`))
      .map((k) => localStorage.getItem(k))
      .filter((c) => !_.isEmpty(c))
      .map((c) => JSON.parse(c || '{}') as T);
    return _.sortBy(result, (r) => (r as any).seq);
  },
  get: <T>(key: string, type: string) => {
    const data = localStorage.getItem(`${type}-${key}`);

    if (data) {
      return JSON.parse(data) as T;
    }
    return undefined;
  },
  save: <T>(item: T, key: string, type: string) => {
    localStorage.setItem(`${type}-${key}`, JSON.stringify(item));
    return item;
  },
  update: <T>(item: T, key: string, type: string) => {
    localStorage.setItem(`${type}-${key}`, JSON.stringify(item));
  },
  delete: (key: string, type: string) => {
    localStorage.removeItem(`${type}-${key}`);
  },
};
