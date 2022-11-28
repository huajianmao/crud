import React, { useEffect } from 'react';
import { Button, Form, Modal } from 'antd';
import _ from 'lodash';

import { CrudModal } from '../types';

declare type EditProps<T> = {
  title: string;
  type: 'add' | 'edit';
  onClose: () => void;
  onSave: (data: T) => void;
  modal: CrudModal<T>;
  initialValues?: T;
};

const Edit = <T extends { id: string }>({
  title,
  type,
  modal,
  onClose,
  onSave,
  initialValues,
}: EditProps<T>) => {
  const modalTitle = `${type === 'add' ? '新增' : '修改'}${title}`;

  const [form] = Form.useForm<T>();

  useEffect(() => {
    if (modal?.setForm) {
      modal.setForm(form);
    }
  }, [form]);

  const handleCancel = () => {
    onClose();
    if (modal?.setForm) {
      modal.setForm(undefined);
    }
  };

  const handleSave = () => {
    onSave(form.getFieldsValue(true));
    if (modal?.setForm) {
      modal.setForm(undefined);
    }
  };

  return (
    <Modal
      width={modal.width}
      style={modal?.style || { height: '80%', maxHeight: '90vh', overflowY: 'auto' }}
      title={modalTitle}
      open={true}
      centered
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose={true}
      footer={false}
    >
      <Form
        className="w-full h-full flex flex-col"
        labelCol={{ span: 6 }}
        form={form}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        onFinish={handleSave}
      >
        <div className="h-full w-full flex flex-col overflow-y-auto">
          {initialValues?.id && <Form.Item name="id" hidden />}
          {modal.body(initialValues)}
        </div>

        <div className="w-full h-12 flex items-center justify-center">
          <div className="flex flex-row mt-6 space-x-8 items-center justify-between">
            {_.isEmpty(modal?.buttons) ? (
              <Button type="primary" size="large" htmlType="submit">
                保存
              </Button>
            ) : (
              <>{modal.buttons}</>
            )}
          </div>
        </div>
      </Form>
    </Modal>
  );
};

export default Edit;
