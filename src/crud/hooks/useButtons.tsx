import React, { useState } from 'react';
import { Button } from 'antd';
import _ from 'lodash';

import { CrudTable } from '../../types';

const useButtons = <T,>(table: CrudTable<T>, button: JSX.Element[], actions?: JSX.Element[]) => {
  const buttons = [];

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  if (table.selection !== undefined) {
    buttons.push(
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `已选中 ${selectedRowKeys.length} 条` : ''}
      </span>,
    );
    const selectionButtons = _.isArray(table.selection) ? table.selection : [table.selection];
    selectionButtons.forEach((btn) => {
      buttons.push(
        <Button disabled={!hasSelected} onClick={() => btn.action(selectedRowKeys)}>
          {btn.title}
        </Button>,
      );
    });
  }

  if (actions) {
    actions.forEach((action) => buttons.push(action));
  }

  button.forEach((b) => buttons.push(b));

  return { rowSelection, buttons };
};

export default useButtons;
