import _ from 'lodash';
import { nanoid } from 'nanoid';

import { CrudApi, CrudItem } from '../../types';

const delay = async (milliseconds?: number) => {
  const time = milliseconds === undefined ? _.random(100, 300) : milliseconds;

  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export const crud = <T extends CrudItem>(type: string, key?: (item: T) => string): CrudApi<T> => {
  const idKey = (item: T) => `${item.id}`;

  return {
    create: async (item: T) => {
      await delay();
      if (item.id) {
        alert('item should not be assigned with an id in create!');
      }
      item.id = nanoid(10);
      const saved = store.save<T>(item, (key || idKey)(item), type);
      return saved ? item.id : undefined;
    },
    get: async (id: string) => {
      await delay();
      return store.get<T>(id, type);
    },
    query: async (): Promise<T[]> => {
      await delay();
      return store.query<T>(type);
    },
    update: async (item: T, values?: { [key: string]: any }) => {
      await delay();
      const newItem: T = values ? { ...item, ...values } : item;
      const updated = store.update<T>(newItem, (key || idKey)(newItem), type);
      return updated ? true : false;
    },
    delete: async (id: string) => {
      await delay();
      store.delete(id, type);
      return true;
    },
  };
};

export const store = {
  query: <T>(type: string, belongTo?: string) => {
    const prefix = belongTo ? `${type}-${belongTo}` : type;
    const result = _.keys(localStorage)
      .filter((k) => k.startsWith(`${prefix}-`))
      .map((k) => localStorage.getItem(k))
      .filter((c) => !_.isEmpty(c))
      .map((c) => JSON.parse(c || '{}') as T);
    return _.sortBy(result, (r) => (r as any).createTime);
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
    return item;
  },
  delete: (key: string, type: string) => {
    localStorage.removeItem(`${type}-${key}`);
  },
};
