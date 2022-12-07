import React, { useState } from 'react';
import { Button, Input } from 'antd';

const { Search } = Input;

const SearchButton = ({
  onSearch,
  onReset,
}: {
  onSearch: (value: string) => void;
  onReset: () => void;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div key="search" className="flex flex-row items-center space-x-1">
      {show && <Search placeholder="请输入" allowClear enterButton="搜索" onSearch={onSearch} />}
      {show && (
        <Button onClick={onReset} danger>
          重置
        </Button>
      )}
      <Button onClick={() => setShow(!show)}>{show ? '取消' : '搜索'}</Button>
    </div>
  );
};

export default SearchButton;
