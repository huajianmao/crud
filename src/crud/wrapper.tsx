import React from 'react';
import { Space } from 'antd';

const Wrapper = (props: { title: string; buttons?: JSX.Element[]; children?: React.ReactNode }) => {
  const { title, buttons, children } = props;

  return (
    <div className="w-full h-full flex flex-col space-y-3">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl font-semibold">{title}</div>
        <Space>
          {buttons?.map((b, index) => (
            <div key={index}>{b}</div>
          ))}
        </Space>
      </div>

      {children}
    </div>
  );
};

export default Wrapper;
