import { store } from './api/local';

export const cache = {
  get: <T>(key: string) => {
    return store.get<T>(key, 'cache');
  },
  save: <T>(key: string, item: T) => {
    store.save<T>(item, key, 'cache');
  },
  clear: (key: string) => {
    store.delete(key, 'cache');
  },
};
