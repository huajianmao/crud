import React from 'react';
import { api, Crud, CrudApi } from '@huajianmao/crud';
import { Form, Input } from 'antd';
import { ColumnType } from 'antd/lib/table';
import _ from 'lodash';

import { Dict as DictType, DictItem } from '../types';

const { TextArea } = Input;

const { crud, setHost } = api.server;
setHost('/api');

const Dict = ({ dict }: { dict?: DictType }) => {
  const api: CrudApi<DictItem> = crud<DictItem>('dictItem');
  const query = async () => {
    return api.query && (await api.query({ dict: dict?.id }));
  };
  const create = async (item: DictItem) => {
    _.set(item, 'dict.id', dict?.id);
    return api.create && (await api.create(item));
  };

  const columns: ColumnType<DictItem>[] = [
    { title: '名称', dataIndex: 'label', key: 'label' },
    { title: '值', dataIndex: 'value', key: 'value' },
    { title: '拼音码', dataIndex: 'pinyin', key: 'pinyin', align: 'center', width: 80 },
    { title: '描述', dataIndex: 'desc', key: 'desc' },
  ];

  const body = () => (
    <>
      <Form.Item name={['dict', 'id']} hidden>
        <Input value={dict?.id} />
      </Form.Item>
      <Form.Item name="label" label="名称" rules={[{ required: true, message: '名称为必填项' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="value" label="值" rules={[{ required: true, message: '值为必填项' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="pinyin" label="拼音码">
        <Input />
      </Form.Item>
      <Form.Item name="desc" label="描述">
        <TextArea />
      </Form.Item>
    </>
  );
  return dict ? (
    <Crud
      key={dict.id}
      title={`[${dict.name}]字典项`}
      table={{ key: 'value', columns }}
      api={{ ...api, query, create }}
      modal={{ body }}
    />
  ) : (
    <></>
  );
};

export default Dict;
