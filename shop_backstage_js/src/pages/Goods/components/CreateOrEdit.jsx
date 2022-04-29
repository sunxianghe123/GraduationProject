import React, {useEffect, useState} from 'react';
import ProForm, {ProFormText, ProFormDateTimePicker } from "@ant-design/pro-form";
import {message, Modal, Skeleton} from "antd";
import {addGoods, editGoodInfo, getCurrentGoodInfo} from "@/services/goods";

const Edit = (props) => {
  // 将表单初始化的值设置成状态，在编辑的时候，获取数据之后，修改状态，状态改变，组件重新渲染
  let [initialValues, setInitialValues] = useState(undefined);
  // actionRef 父组件传过来的表格的引用，可以用来操作表格
  const {isModalVisible, isShowModal, actionRef, editId} = props;
  const type = (editId === undefined) ? '添加' : '编辑';

  useEffect(async () => {
    // 发送请求获取用户详情
    if (editId !== undefined) {
      const response = (await getCurrentGoodInfo(editId))['list'][0];
      console.log(response)
      setInitialValues({
        title: response.title,
        description: response.description,
        price: Number(response.price),
        stock: Number(response.stock),
        cover: response.cover,
        details: response.details,
      })
    }
  }, []);

  const handleSubmit = async (values) =>{
    let response = {};
    if(editId === undefined) {
      response = await addGoods(values);
    } else {
      let params = {...values, id: editId, };
      response = await editGoodInfo(params);
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
      title={`${type}商品`}
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
              label="类别"
              placeholder="请输入商品类别"
              rules={[
                {required: true, message: '请输入商品类别'},
                {max: 12, message: '商品类别最大长度为12个字符'}
              ]}
            />
            <ProFormText
              name="description"
              label="商品名称"
              placeholder="请输入商品名称"
              rules={[
                {required: true, message: '请输入商品名称'},
                {max: 12, message: '商品名称最大长度为12个字符'}
              ]}
            />
            <ProFormText
              name="price"
              label="商品价格"
              placeholder="请输入商品价格"
              rules={[
                {required: true, message: '请输入商品价格'},
              ]}
            />
            <ProFormText
              name="stock"
              label="商品库存"
              placeholder="请输入商品库存"
              rules={[
                {required: true, message: '请输入商品库存'},
              ]}
            />
            <ProFormText
              name="cover"
              label="商品封面"
              placeholder="请输入商品封面"
              rules={[
                {required: true, message: '请输入商品封面'},
              ]}
            />
            <ProFormText
              name="details"
              label="商品详情"
              placeholder="请输入商品详情"
              rules={[
                {required: true, message: '请输入商品详情'},
              ]}
            />
          </ProForm>
      }
    </Modal>
  );
};

export default Edit;
