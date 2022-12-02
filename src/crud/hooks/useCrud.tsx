import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';

import { CrudApi, CrudItem, CrudTable } from '../../types';
import { items2tree } from '../utils';

declare type AddOrEdit = 'add' | 'edit';

declare type CrudType<T> = CrudItem & { parent?: string; children?: T[] };
declare type useCrudParamsType<T> = {
  title: string;
  table: CrudTable<T>;
  api: CrudApi<T>;
};
const useCrud = <T extends CrudType<T>>({ title, table, api }: useCrudParamsType<T>) => {
  const [list, setList] = useState<T[]>([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState<AddOrEdit>('add');
  const [item, setItem] = useState<T>();

  const fetchList = async () => {
    const flatList = api.query && (await api.query());
    const tree: T[] = items2tree(flatList || []);
    setList(tree);
  };

  const onAddOrEdit = (type: AddOrEdit, data?: T) => {
    setShow(true);
    setType(type);
    if (data) {
      setItem(data);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const button = (
    <Button
      type="primary"
      style={{ backgroundColor: '#1890ff' }}
      onClick={() => onAddOrEdit('add')}
    >
      新增
    </Button>
  );

  const onClose = () => {
    setShow(false);
    setItem(undefined);
  };

  const onSave = async (data: T) => {
    const action = type === 'add' ? api.create : api.update;
    const result = action ? await action(data) : false;
    if (!result) {
      message.error(`${title}${type === 'add' ? '添加' : '修改'}失败`);
    } else {
      message.success(`${title}${type === 'add' ? '添加' : '修改'}成功`);
      await fetchList();
      setShow(false);
      setItem(undefined);
    }
  };

  const columns = getColumns({ title, table, api, fetchList, onAddOrEdit });
  return { list, columns, item, type, button, show, onClose, onSave };
};

export default useCrud;

const getColumns = <T extends CrudType<T>>(
  props: useCrudParamsType<T> & {
    fetchList: () => Promise<void>;
    onAddOrEdit: (type: AddOrEdit, data?: T) => void;
  },
) => {
  const { title, table, api, fetchList, onAddOrEdit } = props;
  const onDeleteItem = async (item: T) => {
    if (!api.delete) {
      message.error('删除接口未指定，请联系开发人员！');
      return;
    }

    const success = await api.delete([item.id]);
    if (success) {
      await fetchList();
      message.success(`${title} 删除成功！`);
    } else {
      message.error(`${title} 删除失败`);
    }
  };

  const onRenderAction = (data: T) => {
    return (
      <Space>
        {table?.actions && table?.actions(data)}
        {api.update && (
          <Button size="small" onClick={() => onAddOrEdit('edit', data)}>
            编辑
          </Button>
        )}
        {api.delete && (
          <Popconfirm
            title="确定删除？删除后数据将无法恢复！"
            placement="topRight"
            onConfirm={() => onDeleteItem(data)}
            okText="确定"
            cancelText="取消"
          >
            <Button size="small" danger>
              删除
            </Button>
          </Popconfirm>
        )}
      </Space>
    );
  };

  const newColumns: ColumnType<any>[] = [];
  const onRenderId = (_value: any, _record: T, index: number) => {
    return index + 1;
  };
  const autoId = { title: '序号', key: 'autoid', width: 60, align: 'center', render: onRenderId };
  if (table.tree !== true) {
    newColumns.push(autoId as ColumnType<any>);
  }

  table.columns.forEach((c) => newColumns.push(c));
  if (api?.delete || api?.update) {
    newColumns.push({ title: '操作', key: 'action', align: 'center', render: onRenderAction });
  }

  return newColumns;
};
