import React, { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import _ from 'lodash';

const { Search } = Input;

declare type SearchButtonProps<T> = {
  data: T[];
  filter?: (value: string, item: T) => boolean;
  setResult: (result: T[]) => void;
};

const SearchButton = <T,>({ data, filter, setResult }: SearchButtonProps<T>) => {
  const [show, setShow] = useState(false);

  const onSearch = (value: string) => {
    const found = _.isEmpty(value)
      ? data
      : data.filter((item) => (filter === undefined ? true : filter(value, item)));
    setResult(found);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };
  const onToggle = () => {
    setShow(!show);

    if (show) {
      setResult(data);
    }
  };

  return (
    <div key="search" className="flex flex-row items-center space-x-1">
      {show && <Search placeholder="请输入" allowClear onChange={onChange} onSearch={onSearch} />}
      <Button onClick={onToggle} danger={show}>
        {show ? '取消' : '搜索'}
      </Button>
    </div>
  );
};

export default SearchButton;
