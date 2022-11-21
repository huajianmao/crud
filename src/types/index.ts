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

export declare type CrudTable<T> = {
  key?: string;
  tree?: boolean;
  columns: any[];
  actions?: (item?: T) => JSX.Element[];
};
