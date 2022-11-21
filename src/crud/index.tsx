import React from 'react';
import { Table } from 'antd';

import { CrudApi, CrudModal, CrudTable } from '../types';

import Edit from './edit';
import useCrud from './useCrud';
import Wrapper from './wrapper';

declare type CrudProps<T> = {
  title: string;
  table: CrudTable<T>;
  modal: CrudModal<T>;
  api: CrudApi<T>;
};

const Crud = <T extends { id: string; children?: T[] }>({
  title,
  table,
  api,
  modal,
}: CrudProps<T>) => {
  const { columns, list, button, type, show, item, onClose, onSave } = useCrud(title, table, api);

  return (
    <Wrapper title={`${title}管理`} button={button}>
      <div className="w-full">
        <Table
          rowKey={table.key || 'id'}
          columns={columns}
          dataSource={list}
          pagination={false}
          size="middle"
          bordered
          expandable={{
            childrenColumnName: 'children',
            defaultExpandAllRows: true,
            rowExpandable: (record) => record.children !== undefined && record.children.length > 0,
          }}
        />
      </div>

      {show && (
        <Edit
          title={title}
          type={type}
          initialValues={item}
          onClose={onClose}
          onSave={onSave}
          modal={modal}
        />
      )}
    </Wrapper>
  );
};

export { Crud };
