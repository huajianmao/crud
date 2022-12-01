import _ from 'lodash';

import { CrudApi, CrudItem } from '../../types';

const config = { host: '' };

export const setHost = (host: string) => {
  config.host = host;
};

export const crud = <T extends CrudItem>(type: string, key?: (item: T) => string): CrudApi<T> => {
  const idKey = (item: T) => item.id;

  return {
    create: async (item: T) => {
      const url = getUrl(type);
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      return resp.ok ? await resp.json() : undefined;
    },
    get: async (id: string) => {
      const url = getUrl(type, id);
      const result = await fetch(url);
      const item = (await result.json()) as T;
      return item;
    },
    query: async (): Promise<T[]> => {
      const url = getUrl(type);
      const resp = await fetch(url);
      const items = (await resp.json()) as T[];
      return _.sortBy(items, (a) => a.createTime);
    },
    update: async (item: T, values?: { [key: string]: any }) => {
      item.updateTime = new Date();
      if (!item.createTime) {
        item.createTime = new Date();
      }
      const newItem: T = values ? { ...item, ...values } : item;

      const id = (key || idKey)(item);
      const url = getUrl(type, id);
      const resp = await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      return resp.ok;
    },
    delete: async (id: string) => {
      const url = getUrl(type, id);
      const resp = await fetch(url, { method: 'DELETE' });
      return resp.status === 200;
    },
  };
};

const getUrl = (type: string, id?: string) => {
  const host = config.host;
  const resources = `${host}/${type}s`;
  return id !== undefined ? `${resources}/${id}` : resources;
};
