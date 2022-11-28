import * as local from './utils/api/local';
import * as server from './utils/api/server';

export * from './crud';
export * from './types';
export * from './utils/cache';
export const api = { local, server };
