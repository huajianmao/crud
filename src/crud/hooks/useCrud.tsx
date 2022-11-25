import React, { useEffect, useState } from 'react';
import { Button, message, Popconfirm, Space } from 'antd';

import { CrudApi, CrudTable } from '../../types';
import { items2tree } from '../utils';

declare type AddOrEdit = 'add' | 'edit';

const useCrud = <T extends { id: string; parent?: string; children?: T[] }>(
  title: string,
  table: CrudTable<T>,
  api: CrudApi<T>,
) => {
  const [list, setList] = useState<T[]>([]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState<AddOrEdit>('add');
  const [item, setItem] = useState<T>();

  useEffect(() => {
    const fetchList = async () => {
      const flatList = api.query ? await api.query() : [];
      const tree: T[] = items2tree(flatList);
      setList(tree);
    };

    fetchList();
  }, []);

  const columns = table.columns;

  const onDeleteItem = async (item: T) => {
    if (!api.delete) {
      message.error('删除接口未指定，请联系开发人员！');
      return;
    }

    const success = await api.delete(item.id);
    if (success) {
      setList(list.filter((j) => item.id !== j.id));
      message.success(`${title} 删除成功！`);
    } else {
      message.error(`${title} 删除失败`);
    }
  };

  const onAddOrEdit = (type: AddOrEdit, data?: T) => {
    setShow(true);
    setType(type);
    if (data) {
      setItem(data);
    }
  };

  const onClose = () => {
    setShow(false);
    setItem(undefined);
  };

  const onSave = async (data: T) => {
    const action = type === 'add' ? api.create : api.update;
    const result = action ? await action(data) : false;
    if (!result) {
      message.error(`${title}${type === 'add' ? '添加' : '修改'}失败`);
      return;
    }

    if (type === 'add') {
      setList([...list, result]);
    } else {
      const newList = [...list];
      const index = newList.findIndex((item) => item.id === result.id);
      if (index >= 0) {
        newList[index] = result;
      }
      setList(newList);
    }
    setShow(false);
    setItem(undefined);
  };

  const onRenderId = (_value: any, _record: T, index: number) => {
    return index + 1;
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

  const newColumns = [
    ...(table.tree === true
      ? []
      : [{ title: '序号', key: 'auto_id', width: 60, align: 'center', render: onRenderId }]),
    ...columns,
    { title: '操作', key: 'action', width: 150, align: 'center', render: onRenderAction },
  ];

  const button = (
    <Button type="primary" onClick={() => onAddOrEdit('add')}>
      新增
    </Button>
  );

  return {
    list, //: _.sortBy(t => t.added),
    columns: newColumns,
    onRenderAction,
    item,
    type,
    button,
    show,
    onClose,
    onSave,
  };
};

export default useCrud;
