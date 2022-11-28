import React, { CSSProperties } from 'react';
import { FormInstance } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnType } from 'antd/lib/table';

export declare type CrudItem = {
  id: string;
  seq?: number;
  added?: Date;
  updated?: Date;
};

export declare type CrudApi<T> = {
  create?: (item: T) => Promise<T>;
  query?: () => Promise<T[]>;
  update?: (item: T) => Promise<T>;
  delete?: (id: string) => Promise<boolean>;
};

export declare type CrudModal<T> = {
  setForm?: (form: FormInstance<T> | undefined) => void;
  body: (init?: Store) => JSX.Element;
  // buttons: This will add buttons to the footer of the modal
  buttons?: JSX.Element[];
  footer?: JSX.Element;
  width?: string | number;
  style?: CSSProperties;
};

declare type SelectionButton = { title: string; action: (selectedRowKeys: React.Key[]) => void };
declare type SearchConfig = { searchText?: string; resetText?: string; submitText?: string };
export declare type CrudTable<T> = {
  key?: string;
  tree?: boolean;
  // selection: add action buttons for selected items on the top right of the table next to the actions buttons
  selection?: SelectionButton | SelectionButton[];
  search?: false | SearchConfig;
  columns: ColumnType<T>[];
  // actions: add action buttons on top right of the table
  actions?: (item?: T) => JSX.Element[];
};
