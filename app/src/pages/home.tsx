import React from 'react';
import { api as LocalAPI, Crud, CrudApi } from '@huajianmao/crud';
import { Form, Input } from 'antd';
import { ColumnType } from 'antd/lib/table';

declare type Record = {
  id: string;
  name: string;
};

const Home = () => {
  const columns: ColumnType<Record>[] = [{ title: '字典名称', dataIndex: 'name', key: 'name' }];
  const modal = {
    body: () => (
      <>
        <Form.Item
          name="name"
          label="字典名称"
          rules={[{ required: true, message: '字典名称为必填项' }]}
        >
          <Input />
        </Form.Item>
      </>
    ),
  };
  const api: CrudApi<Record> = LocalAPI.local.crud<Record>('record');

  const btns = [{ title: '导入体检记录', action: () => {} }];
  return (
    <div className="p-6">
      <Crud
        title="Test"
        table={{ key: 'name', columns, selection: btns }}
        modal={modal}
        api={api}
      />
    </div>
  );
};

export default Home;
