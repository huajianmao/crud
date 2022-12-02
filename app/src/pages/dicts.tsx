import React, { useState } from 'react';
import { api, Crud, CrudApi } from '@huajianmao/crud';
import { Button, Form, Input } from 'antd';
import { ColumnsType } from 'antd/lib/table';

import Dict from '../components/Dict';
import { Dict as DictType, DictItem } from '../types';

const { TextArea } = Input;

const { crud, setHost } = api.server;

setHost('/api');

const DictList = () => {
  const [current, setCurrent] = useState<DictType>();

  const modal = {
    width: '50vw',
    body: () => (
      <>
        <Form.Item
          name="name"
          label="字典名称"
          rules={[{ required: true, message: '字典名称为必填项' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="描述">
          <TextArea />
        </Form.Item>
      </>
    ),
  };

  const renderLink = (name: string, record: DictType) => {
    return (
      <Button type="link" onClick={() => setCurrent(record)}>
        {name}
      </Button>
    );
  };
  const columns: ColumnsType<DictType> = [
    { title: '字典名称', dataIndex: 'name', key: 'name', width: 250, render: renderLink },
    {
      title: '字典项',
      dataIndex: 'items',
      key: 'items',
      render: (is) => is?.map((i: DictItem) => i.label).join('; '),
    },
    { title: '描述', dataIndex: 'description', key: 'description' },
  ];

  const api: CrudApi<DictType> = crud<DictType>('dict');

  return (
    <div className="w-full flex flex-row pt-4">
      <div className="w-1/2 p-4">
        <Crud title="字典" table={{ columns }} modal={modal} api={api} />
      </div>
      <div className="w-1/2 p-4">
        <Dict dict={current} />
      </div>
    </div>
  );
};

export default DictList;
