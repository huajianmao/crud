import React from 'react';
import { Table } from 'antd';

import { CrudApi, CrudModal, CrudTable } from '../types';

import Edit from './edit';
import useCrud from './useCrud';
import Wrapper from './wrapper';

import './index.css';

declare type CrudProps<T> = {
  title: string;
  table: CrudTable<T>;
  modal: CrudModal<T>;
  api: CrudApi<T>;
  actions?: JSX.Element[];
};

const Crud = <T extends { id: string; children?: T[] }>(props: CrudProps<T>) => {
  const { title, table, modal, api, actions } = props;
  const { columns, list, button, type, show, item, onClose, onSave } = useCrud(title, table, api);

  return (
    <Wrapper title={`${title}管理`} buttons={actions ? [...actions, button] : [button]}>
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
