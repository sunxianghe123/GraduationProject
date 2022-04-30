import React, {useEffect, useState} from 'react';
import ProForm, {ProFormDigit, ProFormText, ProFormUploadButton} from "@ant-design/pro-form";
import {message, Modal, Skeleton} from "antd";
import {addSlides, editSlideInfo, getCurrentSlideInfo} from "@/services/slides";

const Edit = (props) => {
  // 将表单初始化的值设置成状态，在编辑的时候，获取数据之后，修改状态，状态改变，组件重新渲染
  let [initialValues, setInitialValues] = useState(undefined);
  // actionRef 父组件传过来的表格的引用，可以用来操作表格
  const {isModalVisible, isShowModal, actionRef, editId} = props;
  const type = (editId === undefined) ? '添加' : '编辑';

  useEffect(async () => {
    // 发送请求获取轮播图详情
    if (editId !== undefined) {
      const response = (await getCurrentSlideInfo(editId))['list'][0];
      response.img = JSON.parse(response.img);
      setInitialValues({
        title: response.title,
        url: response.url,
        img: response.img,
        seq: response.seq,
      })
    }
  }, []);

  const handleSubmit = async (values) => {
    let response = editId !== undefined ? (await getCurrentSlideInfo(editId))['list'][0] : {};
    values.img = values.img ? JSON.stringify(values.img) : undefined;
    let params = {...response, ...values, id: editId};
    if (editId === undefined) {
      response = await addSlides(params);
    } else {
      response = await editSlideInfo(params);
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
      title={`${type}轮播图`}
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
            onFinish={values => handleSubmit(values)}
          >
            <ProFormText
              name="title"
              label="轮播图名称"
              placeholder="请输入轮播图名称"
              rules={[
                {required: true, message: '请输入轮播图名称'},
                {max: 12, message: '轮播图最大长度为12个字符'}
              ]}
            />
            <ProFormText
              name="url"
              label="图片链接地址"
              placeholder="请输入图片链接地址"
              rules={[
                {required: true, message: '请输入图片链接地址'},
              ]}
            />
            <ProFormDigit
              name="seq"
              label="轮播图排序"
              placeholder="请输入轮播图排序"
              min={0}
              max={9}
              rules={[
                {required: true, message: '请输入轮播图排序'},
              ]}
            />
            <ProFormUploadButton
              name="img"
              label="图片"
              rules={[
                {required: true, message: '请上传图片'},
              ]}
            />
          </ProForm>
      }
    </Modal>
  );
};

export default Edit;
