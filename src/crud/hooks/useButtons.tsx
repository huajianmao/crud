import React, { useState } from 'react';
import _ from 'lodash';

import { CrudTable } from '../../types';

const useButtons = <T,>(table: CrudTable<T>, button: JSX.Element, actions?: JSX.Element[]) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const buttons = [];
  if (table.selection !== undefined) {
    buttons.push(
      <span style={{ marginLeft: 8 }}>
        {hasSelected ? `已选中 ${selectedRowKeys.length} 条` : ''}
      </span>,
    );

    const Comps = _.isArray(table.selection) ? table.selection : [table.selection];
    Comps.forEach((Comp) =>
      buttons.push(<Comp selectedKeys={selectedRowKeys} disabled={!hasSelected} />),
    );
  }
  if (actions) {
    actions.forEach((action) => buttons.push(action));
  }
  buttons.push(button);

  return { rowSelection, buttons };
};

export default useButtons;
