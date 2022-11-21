import React from 'react';

const Wrapper = ({
  title,
  button,
  children,
}: {
  title: string;
  button?: JSX.Element;
  children?: React.ReactNode;
}) => {
  return (
    <div className="w-full h-full flex flex-col space-y-3">
      <div className="flex flex-row justify-between items-center">
        <div className="text-xl font-semibold">{title}</div>
        {button}
      </div>

      {children}
    </div>
  );
};

export default Wrapper;
