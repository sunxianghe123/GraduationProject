import React from 'react';
import ProForm, {ProFormText} from "@ant-design/pro-form";
import {message, Modal} from "antd";
import {addUser} from "@/services/user";

const Create = (props) => {
  const {isModalVisible, isShowModal, actionRef} = props;

  /**
   * 添加用户
   * @param values
   */
  const postCreateUser = async (values) => {
    console.log(values);
    const response = await addUser(values);
    if (response.code === 200) {
      message.success('添加成功');
      // 刷新表格数据
      actionRef.current.reload();
      // 关闭对话框
      isShowModal(false);
    } else {
      message.error(response.msg);
    }
  }

  return (
    <Modal
      title="添加用户"
      visible={isModalVisible}
      // onOk={handleOk}
      footer={null}
      onCancel={() => isShowModal(false)}
      destroyOnClose={true}
    >
      <ProForm
        onFinish={async (values) => {
          await postCreateUser(values);
        }}>
        <ProFormText
          name="username"
          label="昵称"
          placeholder="请输入昵称"
          rules={[
            {required: true, message: '请输入昵称'},
            {max: 12, message: '昵称最大长度为12个字符'}
          ]}
        />
        <ProFormText
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[
            {required: true, message: '请输入邮箱'},
            {type: 'email', message: '邮箱格式不正确'}
          ]}
        />
        <ProFormText.Password
          name="password"
          label="密码"
          placeholder="请输入密码"
          rules={[
            {required: true, message: '请输入昵称'},
            {min: 6, message: '密码最小为6位'},
            {max: 12, message: '密码最大位12位'}
          ]}
        />
      </ProForm>
    </Modal>
  );
};

export default Create;
