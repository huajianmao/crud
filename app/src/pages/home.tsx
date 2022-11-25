import React from 'react';
import { Crud, CrudApi } from '@huajianmao/crud';
import { Form, Input } from 'antd';
import { ColumnType } from 'antd/lib/table';

const Home = () => {
  const columns: ColumnType<any>[] = [{ title: '字典名称', dataIndex: 'name', key: 'name' }];
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
  const api: CrudApi<any> = {
    query: async () => {
      return [] as any[];
    },
  };

  return (
    <div>
      <Crud title="Test" table={{ columns }} modal={modal} api={api} />
    </div>
  );
};

export default Home;
