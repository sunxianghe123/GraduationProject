import React, {useEffect, useState} from 'react';
import ProForm, {ProFormText, ProFormDateTimePicker } from "@ant-design/pro-form";
import {message, Modal, Skeleton} from "antd";
import {addUser, editUser, getCurrentUserInfo} from "@/services/user";

const Edit = (props) => {
  // 将表单初始化的值设置成状态，在编辑的时候，获取数据之后，修改状态，状态改变，组件重新渲染
  let [initialValues, setInitialValues] = useState(undefined);
  // actionRef 父组件传过来的表格的引用，可以用来操作表格
  const {isModalVisible, isShowModal, actionRef, editId} = props;
  const type = (editId === undefined) ? '添加' : '编辑';

  useEffect(async () => {
    // 发送请求获取用户详情
    if (editId !== undefined) {
      const response = (await getCurrentUserInfo(editId))['list'][0];
      console.log(response)
      setInitialValues({
        username: response.username,
        age: response.age,
        avatar: response.avatar,
        birthday: response.birthday,
        email: response.email,
        job: response.job,
        path: response.path,
        phone: response.phone,
        sex: response.sex
      })
    }
  }, []);

  const handleSubmit = async (values) =>{
    let response = {};
    if(editId === undefined) {
      response = await addUser(values);
    } else {
      let params = {...values, user_id: editId};
      response = await editUser(params);
    }
    if (response.code === 200) {
      message.success(`${type}成功`);
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
      key='modal'
      title={`${type}用户`}
      visible={isModalVisible}
      // onOk={handleOk}
      footer={null}
      onCancel={() => isShowModal(false)}
      destroyOnClose={true}
    >
      {
        initialValues === undefined && editId !== undefined
          ?
          <Skeleton paragraph={{rows: 4}}/>
          :
          <ProForm
            initialValues={initialValues}
            // onFinish={async (values) => {
            //   await postEditUser({...values, user_id: editId});
            // }}
            onFinish={values => handleSubmit(values)}
          >
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
            <ProFormText
              name="phone"
              label="手机号码"
              placeholder="请输入手机号码"
              rules={[
                {required: true, message: '请输入手机号码'},
                {max: 11, message: '手机号码最大为11位'}
              ]}
            />
            <ProFormText.Password
              name="password"
              label="密码"
              placeholder="请输入密码"
              rules={[
                {required: true, message: '请输入密码'},
                {min: 6, message: '密码最小为6位'},
                {max: 12, message: '密码最大位12位'}
              ]}
            />
            <ProFormText
              name="avatar"
              label="头像"
              placeholder="请输入图片地址"
              rules={[
                {required: true, message: '请输入图片地址'},
              ]}
            />
            <ProFormText
              name="path"
              label="收货地址"
              placeholder="请输入收货地址"
              rules={[
                {required: true, message: '请输入收货地址'},
              ]}
            />
            <ProFormDateTimePicker
              name="birthday"
              label="生日"
            />
          </ProForm>
      }
    </Modal>
  );
};

export default Edit;
