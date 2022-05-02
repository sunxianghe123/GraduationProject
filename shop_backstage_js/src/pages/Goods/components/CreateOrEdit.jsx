import React, {useEffect, useState} from 'react';
import ProForm, {ProFormDigit, ProFormText, ProFormUploadButton, ProFormTextArea} from "@ant-design/pro-form";
import {message, Modal, Skeleton, Cascader} from "antd";
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
      response.cover = JSON.parse(response.cover);
      response.pics = JSON.parse(response.pics);
      setInitialValues({
        title: response.title,
        description: response.description,
        price: Number(response.price),
        stock: Number(response.stock),
        cover: response.cover,
        pics: response.pics,
        details: response.details,
      })
    }
  }, []);

  const handleSubmit = async (values) => {
    let response = editId !== undefined ? (await getCurrentGoodInfo(editId))['list'][0] : {};
    values.cover = values.cover ? JSON.stringify(values.cover) : undefined;
    values.pics = values.pics ? JSON.stringify(values.pics) : undefined;
    let params = {...response, ...values, id: editId};
    if (editId === undefined) {
      response = await addGoods(params);
    } else {
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
                {max: 20, message: '商品名称最大长度为12个字符'}
              ]}
            />
            <ProFormDigit
              name="price"
              label="商品价格"
              placeholder="请输入商品价格"
              min={0}
              max={999999999}
              rules={[
                {required: true, message: '请输入商品价格'},
              ]}
            />
            <ProFormDigit
              name="stock"
              label="商品库存"
              placeholder="请输入商品库存"
              min={0}
              max={9999}
              rules={[
                {required: true, message: '请输入商品库存'},
              ]}
            />
            <ProFormUploadButton
              name="cover"
              label="商品封面"
              action="cover.do"
              rules={[
                {required: true, message: '请上传商品封面'},
              ]}
            />
            <ProFormUploadButton
              name="pics"
              label="商品图集"
              rules={[
                {required: true, message: '请上传商品图集'},
              ]}
            />
            <ProFormTextArea
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
