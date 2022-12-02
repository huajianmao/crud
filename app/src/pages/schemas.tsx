import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Crud } from '@huajianmao/crud';
import { Button, Form, Input, Radio, Tag, TreeSelect } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';

// import { createSchema, deleteSchema, getSchemas, updateSchema } from '../../redux/features/archive';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import ArchiveService from '../../services/archive';
import { Schema } from '../types';

const { TextArea } = Input;

const SchemaList = () => {
  const schemas = Object.values(useAppSelector(getSchemas));

  const modal = {
    width: '80vw',
    body: (initialValues?: Store) => (
      <>
        <Form.Item
          name="name"
          label="业务名称"
          rules={[{ required: true, message: '业务名称为必填项' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="业务编码"
          rules={[
            { required: true, message: '请输入唯一标记表单的业务编号！' },
            () => ({
              validator(obj, value) {
                if (
                  !ArchiveService.schemas.isSchemaCodeConflict(
                    value,
                    schemas.filter((s) => s.id !== initialValues?.id),
                  )
                ) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('表单的业务编号冲突，请重新输入！'));
              },
            }),
          ]}
        >
          <Input
            placeholder="唯一标记表单的编号，例如HRP.01.01.v1"
            disabled={initialValues?.code !== undefined}
          />
        </Form.Item>
        <Form.Item name="parent" label="所属父业务">
          <TreeSelect
            style={{ width: '100%' }}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            treeData={ArchiveService.schemas.schemas2tree(schemas)}
            allowClear
            placeholder="请选择所属父业务！无父业务可不填"
            treeDefaultExpandAll
          />
        </Form.Item>
        <Form.Item
          name="path"
          label="数据路径"
          rules={[{ required: true, message: '数据路径为必填项' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="isList" label="为多次业务?">
          <Radio.Group
            options={[
              { label: '是', value: true },
              { label: '否', value: false },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="schema" label="业务表单">
          <TextArea />
        </Form.Item>
      </>
    ),
  };

  const navigate = useNavigate();
  const itemLink = (a: Schema) => `${constants.url.schemas}/${a.id}`;

  const columns: ColumnsType<Schema> = [
    { title: '业务编码', dataIndex: 'code', key: 'code', width: 160 },
    {
      title: '业务名称',
      dataIndex: 'name',
      key: 'name',
      render: (name, item) =>
        item && item.children === undefined ? <Link to={itemLink(item)}>{name}</Link> : name,
    },
    { title: '数据路径', dataIndex: 'path', key: 'path' },
    {
      title: '多次业务？',
      dataIndex: 'isList',
      key: 'isList',
      width: 160,
      align: 'center',
      render: (y) => (y ? '是' : '否'),
    },
    {
      title: '表单来源',
      dataIndex: 'type',
      key: 'type',
      width: 120,
      align: 'center',
      render: (t) => (t ? <Tag color="#108ee9">{t}</Tag> : <Tag color="#f50">自定义</Tag>),
    },
    // { title: '业务表单', dataIndex: 'schema', key: 'schema' },
  ];

  const extraActions = (item?: Schema) => {
    return [
      <div key="view" className="w-12">
        {item && item.children === undefined ? (
          <Button
            size="small"
            type="primary"
            style={{ backgroundColor: '#1890ff' }}
            onClick={() => navigate(itemLink(item))}
          >
            预览
          </Button>
        ) : (
          <></>
        )}
      </div>,
    ];
  };

  const dispatch = useAppDispatch();

  return (
    <div className="pt-4">
      <Crud
        title="档案业务"
        table={{ tree: true, columns, actions: extraActions }}
        modal={modal}
        api={{
          ...API.schemas,
          create: async (item: Schema) => {
            const saved = await API.schemas.create(item);
            dispatch(createSchema(saved));
            return saved;
          },
          update: async (item: Schema) => {
            const updated = await API.schemas.update(item);
            dispatch(updateSchema(updated));
            return updated;
          },
          delete: async (id: string) => {
            const result = await API.schemas.delete(id);
            if (result) {
              dispatch(deleteSchema(id));
            }
            return result;
          },
        }}
      />
    </div>
  );
};

export default SchemaList;
