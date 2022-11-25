import React from 'react';
import { FormInstance } from 'antd';
import { Store } from 'antd/lib/form/interface';

export declare type CrudApi<T> = {
  create?: (item: T) => Promise<T>;
  query?: () => Promise<T[]>;
  update?: (item: T) => Promise<T>;
  delete?: (id: string) => Promise<boolean>;
};

export declare type CrudModal<T> = {
  setForm?: (form: FormInstance<T> | undefined) => void;
  body: (init?: Store) => JSX.Element;
  buttons?: JSX.Element[];
  footer?: JSX.Element;
  width?: string | number;
};

declare type SelectionComp = React.FC<{ selectedKeys?: React.Key[]; disabled?: boolean }>;
declare type SearchConfig = { searchText?: string; resetText?: string; submitText?: string };
export declare type CrudTable<T> = {
  key?: string;
  tree?: boolean;
  selection?: SelectionComp | SelectionComp[];
  search?: false | SearchConfig;
  columns: any[];
  actions?: (item?: T) => JSX.Element[];
};
