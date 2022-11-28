import _ from 'lodash';
import { nanoid } from 'nanoid';

import { CrudItem } from '../../types';

const config = { host: '' };

export const setHost = (host: string) => {
  config.host = host;
};

export const crud = <T extends CrudItem>(type: string, key?: (item: T) => string) => {
  const idKey = (item: T) => item.id;

  return {
    create: async (item: T) => {
      if (!item.id) {
        item.id = nanoid(10);
      }
      if (!item.added) {
        item.added = new Date();
      }
      if (!item.updated) {
        item.updated = new Date();
      }
      const url = getUrl(type);
      await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      return item;
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
      return _.sortBy(items, (a) => a.seq || a.added);
    },
    update: async (item: T, values?: { [key: string]: any }) => {
      item.updated = new Date();
      if (!item.added) {
        item.added = new Date();
      }
      const newItem: T = values ? { ...item, ...values } : item;

      const id = (key || idKey)(item);
      const url = getUrl(type, id);
      await fetch(url, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });
      return newItem;
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
