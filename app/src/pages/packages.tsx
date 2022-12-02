import React, { useState } from 'react';
import { api, Crud, CrudApi } from '@huajianmao/crud';
import { Form, FormInstance, Input, InputNumber, Radio, Tag, Tooltip, Tree, TreeProps } from 'antd';
import { Store } from 'antd/lib/form/interface';
import { ColumnsType } from 'antd/lib/table';
import { DataNode } from 'antd/lib/tree';
import _ from 'lodash';

import { Option, Package } from '../types';
import depts from '../utils/cascader/depts.json';
const cascaders = { 体检科室: depts as any[] };

const option2treeItem = (option: Option): DataNode => {
  return {
    key: option.value as number | string,
    title: option.label,
    children: option.children?.map(option2treeItem),
  };
};
const Helper = { misc: { option2treeItem } };

const { crud, setHost } = api.server;
setHost('/api');

const { TextArea } = Input;

const makeIndex = (options: DataNode[], level = 0) => {
  const index: { [key: string]: { title: string; level: number } } = {};
  options.forEach((o) => {
    index[o.key] = { title: o.title as string, level };
    const cIndex = makeIndex(o.children || [], level + 1);
    _.merge(index, cIndex);
  });
  return index;
};

const PackageList = () => {
  const [form, setForm] = useState<FormInstance<Package>>();

  const options = cascaders['体检科室']?.map(Helper.misc.option2treeItem);
  const optionsIndex = makeIndex(options);

  const onCheck: TreeProps['onCheck'] = (checkedKeys) => {
    const depts = checkedKeys as string[];
    const newData = composeData(depts, options);
    form?.setFieldsValue({ depts, content: newData });
  };

  const modal = {
    setForm,
    body: (initialValues?: Store) => (
      <>
        <Form.Item
          name="name"
          label="套餐名称"
          rules={[{ required: true, message: '套餐名称为必填项' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="description" label="套餐描述">
          <TextArea />
        </Form.Item>
        <Form.Item label="适用年龄" style={{ marginBottom: '0' }}>
          <Form.Item name={['range', 'age', 'low']} style={{ display: 'inline-block' }}>
            <InputNumber min={1} />
          </Form.Item>
          <span
            style={{
              display: 'inline-block',
              width: '24px',
              lineHeight: '32px',
              textAlign: 'center',
            }}
          >
            ~
          </span>
          <Form.Item name={['range', 'age', 'up']} style={{ display: 'inline-block' }}>
            <InputNumber min={1} />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name={['range', 'gender']}
          label="适用人群性别"
          rules={[{ required: true, message: '适用人群性别为必选项' }]}
        >
          <Radio.Group
            options={[
              { label: '通用', value: '通用' },
              { label: '男', value: '男' },
              { label: '女', value: '女' },
            ]}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="seq" label="显示顺序">
          <InputNumber />
        </Form.Item>
        <Form.Item name="depts" label="套餐内容选择">
          <Tree
            checkable
            defaultCheckedKeys={initialValues?.depts || '[]'}
            onCheck={onCheck}
            treeData={options}
          />
        </Form.Item>
      </>
    ),
  };

  const rangeRender = (range?: { age?: { low?: number; up?: number }; gender: string }) => {
    const colors = { 男: '#108ee9', 女: '#f50' };
    return (
      <div className="flex flex-row">
        <div className="w-12 flex flex-row justify-end">
          {range?.gender && <Tag color={_.get(colors, range.gender)}>{range.gender}</Tag>}
        </div>
        {(range?.age?.low !== undefined || range?.age?.up !== undefined) && (
          <div className="flex flex-row">
            <span className="w-10">{range?.age?.low}</span> ~{' '}
            <span className="w-10">{range?.age?.up}</span>
          </div>
        )}
      </div>
    );
  };

  const deptsRender = (depts?: string[]) => {
    const contained = depts?.map((dept) => optionsIndex[dept]);
    const level0 = contained?.filter((item) => item.level === 0) || [];
    const level1 = contained?.filter((item) => item.level === 1) || [];
    const level2 = contained?.filter((item) => item.level === 2) || [];

    return (
      <div className="flex flex-row">
        <Tooltip title={level0.map((o) => o.title).join(', ')}>共含{level0.length}个科室，</Tooltip>
        <Tooltip title={level1.map((o) => o.title).join(', ')}>{level1.length}项检查，</Tooltip>
        <Tooltip title={level2.map((o) => o.title).join(', ')}>{level2.length}项检查细项</Tooltip>
      </div>
    );
  };

  const columns: ColumnsType<Package> = [
    { title: '套餐名称', dataIndex: 'name', key: 'name', width: 250 },
    {
      title: '适用范围',
      dataIndex: 'range',
      key: 'range',
      width: 120,
      align: 'center',
      render: rangeRender,
    },
    { title: '套餐内容', dataIndex: 'depts', key: 'depts', render: deptsRender },
    // { title: '描述', dataIndex: 'description', key: 'description' },
  ];

  const api: CrudApi<Package> = crud<Package>('package');

  return (
    <div className="pt-4">
      <Crud title="体检套餐" table={{ columns }} modal={modal} api={api} />
    </div>
  );
};

export default PackageList;

const fields: string[] = ['results', 'items'];
const prefix = 'content.examination.depts';
export const composeData = (keys: string[], options: DataNode[], level = 0) => {
  const data: any[] = [];
  options
    .filter((o) => keys.includes(o.key as string))
    .forEach((item) => {
      const dept = { code: item.key, name: item.title };
      const fieldName = fields[level];
      if (item.children !== undefined) {
        _.set(dept, fieldName, composeData(keys, item.children, level + 1));
      }
      data.push(dept);
    });

  if (level === 0) {
    const content = {};
    _.set(content, prefix, data);
    return content;
  } else {
    return data;
  }
};
