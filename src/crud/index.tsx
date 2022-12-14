import React from 'react';
import { Table } from 'antd';

import { CrudApi, CrudModal, CrudTable } from '../types';

import useButtons from './hooks/useButtons';
import useCrud from './hooks/useCrud';
import Edit from './edit';
import Wrapper from './wrapper';

import './index.css';

// FIXME:
// columns:
// =============================================================
// valueType: 'dateRange' / 'date' / 'select' / 'textarea' / ...
// hiddenInTable
// search
// formItemProps: {rules: []}

declare type CrudProps<T> = {
  title: string;
  table: CrudTable<T>;
  modal: CrudModal<T>;
  api: CrudApi<T>;
  actions?: JSX.Element[];
};

const Crud = <T extends { id: string; children?: T[] }>(props: CrudProps<T>) => {
  const { title, table, modal, api, actions } = props;
  const { columns, filtered, button, type, show, item, onClose, onSave } = useCrud({
    title,
    table,
    api,
  });
  const { buttons, rowSelection } = useButtons(table, button, actions);

  return (
    <Wrapper title={title ? `${title}管理` : ''} buttons={buttons}>
      <div className="w-full">
        <Table
          onRow={table.onRow}
          rowKey={table.key || 'id'}
          rowSelection={table.selection && rowSelection}
          pagination={
            table.pagination !== undefined && table.pagination !== false && table.pagination
          }
          columns={columns}
          dataSource={filtered}
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
