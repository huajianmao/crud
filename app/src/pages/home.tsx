import React, { useState } from 'react';
import { Crud, CrudApi } from '@huajianmao/crud';
import { Form, Input } from 'antd';
import { ColumnType } from 'antd/lib/table';

const Home = () => {
  const columns: ColumnType<any>[] = [{ title: '字典名称', dataIndex: 'name', key: 'name' }];
  const [list, setList] = useState<any[]>([]);
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
    create: async (item: any) => {
      setList([...list, item]);
      return item;
    },
  };

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
