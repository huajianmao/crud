import React from 'react';
import { Crud } from '@huajianmao/crud';
import { message } from 'antd';
import { ColumnType } from 'antd/lib/table';

const query = async () => {
  return [
    { id: '1', name: '张三', idNo: '331022198802292239' },
    { id: '2', name: '李四', idNo: '141022198802292239' },
  ] as Archive[];
};

declare type Archive = { id: string; name: string; idNo: string };
const Selection = () => {
  const columns: ColumnType<Archive>[] = [
    { title: '姓名', dataIndex: 'name', key: 'name', width: 110, align: 'center' },
    { title: '身份证号码', dataIndex: 'idNo', key: 'idNo', width: 180, align: 'center' },
  ];

  const doImportArchives = (checkupIds: React.Key[]) => {
    message.info(`将为这些人创建档案: ${checkupIds?.join(', ')}`);
  };

  const imoprtButton = { title: '创建档案', action: doImportArchives };
  return (
    <div className="p-10">
      <Crud
        title=""
        table={{ columns, selection: imoprtButton }}
        modal={{ body: () => <></> }}
        api={{ query }}
      />
    </div>
  );
};

export default Selection;
