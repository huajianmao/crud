import React, { CSSProperties, ReactNode } from 'react';

declare type ModalProps = {
  title: string;
  width?: string | number;
  style?: CSSProperties;
  onCancel: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ children, width, title, style = {}, onCancel }) => {
  const overlayStyle = `fixed inset-0 bg-gray-500 bg-opacity-50 flex flex-row justify-center items-center z-50 transition-opacity opacity-100`;
  const modalClass = `bg-white shadow-xl rounded-md`;
  const modalStyle: CSSProperties = {
    maxWidth: '99vw',
    maxHeight: '90vh',
    minWidth: '50%',
    minHeight: '50%',
    overflowY: 'auto',
    ...style,
    width,
  };

  return (
    <div className={overlayStyle}>
      <div className={modalClass} style={modalStyle}>
        <div className="sticky top-0 grow-0 z-10 flex flex-row px-4 py-2 items-center justify-between bg-white border-b border-b-gray-300">
          <div className="text-xl font-bold">{title}</div>
          <div className="text-xl cursor-pointer" onClick={onCancel}>
            X
          </div>
        </div>

        <div className="grow w-full overflow-x-auto overflow-y-auto p-4">
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
