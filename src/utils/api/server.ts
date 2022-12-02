import _ from 'lodash';
import qs from 'qs';

import { CrudApi, CrudItem } from '../../types';

const config = { host: '' };

export const setHost = (host: string) => {
  config.host = host;
};

export const crud = <T extends CrudItem>(type: string): CrudApi<T> => {
  return {
    create: async (item: T): Promise<string | undefined> => {
      const url = getUrl(type);
      return await request.post(url, item);
    },
    get: async (id: string): Promise<T | undefined> => {
      const url = getUrl(type, id);
      const json = await request.get(url);
      return json as T;
    },
    query: async (params?: { [key: string]: string }): Promise<T[]> => {
      const paramsStr = qs.stringify(params);
      const url = params ? `${getUrl(type)}?${paramsStr}` : getUrl(type);
      const json = await request.get(url);
      return _.sortBy(json as T[], (a) => a.createTime);
    },
    update: async (item: T, values?: { [key: string]: any }) => {
      item.updateTime = new Date();
      if (!item.createTime) {
        item.createTime = new Date();
      }
      const newItem: T = values ? { ...item, ...values } : item;

      const url = getUrl(type);
      return request.put(url, newItem);
    },
    delete: async (ids: string[]) => {
      const url = getUrl(type);
      return request.delete(url, ids);
    },
  };
};

export const request = {
  post: async <T>(url: string, item: T) => {
    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return resp.ok ? await resp.json() : undefined;
  },
  get: async (url: string) => {
    const resp = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return resp.ok ? await resp.json() : undefined;
  },
  put: async <T>(url: string, item: T) => {
    const resp = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    return resp.ok;
  },
  delete: async (url: string, ids: string[]) => {
    const resp = await fetch(url, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ids),
    });
    return resp.ok;
  },
};

const getUrl = (type: string, id?: string) => {
  const host = config.host;
  const resources = `${host}/${type}s`;
  return id !== undefined ? `${resources}/${id}` : resources;
};
