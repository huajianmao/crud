export declare type Dict = {
  id: string;
  name: string;
  description?: string;
  items: DictItem[];
};

export declare type DictItem = {
  id: string;
  label: string;
  value: string | boolean | number;
  pinyin?: string;
  normal?: boolean;
  desc?: string;
  children?: DictItem[];
};

export declare type Package = {
  id: string;
  name: string;
  description: any;
  range?: { age?: { low?: number; up?: number }; gender: '通用' | '男' | '女' };
  depts: string[];
  content: any;
};

export declare type Option = {
  label: string;
  value: string | boolean | number;
  pinyin?: string;
  normal?: boolean;
  children?: Option[];
};

export declare type Schema = {
  id: string;
  name: string;
  code: string;
  path: string;
  isList?: boolean;
  icon?: string;
  schema?: string | object;
  type: 'system' | 'user';

  parent?: string;
};
