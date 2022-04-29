import React, {useRef, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, Image, Switch, message} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {getGoods, lockGood, isRecommendGood} from "@/services/goods";
import CreateOrEdit from "@/pages/Goods/components/CreateOrEdit";

const Index = () => {
  let [isModalVisible, setIsModalVisible] = useState(false);
  // let [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  let [editId, setEditId] = useState(undefined);

  // 表格的ref，便于自定义操作表格
  const actionRef = useRef();

  /**
   * 获取商品列表数据
   * @param params
   * @returns {Promise<{total: *, data: *, success: boolean}>}
   */
  const getData = async (params) => {
    const response = await getGoods(params);
    console.log(response)
    return {
      data: response?.data,
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response?.pagination?.total,
    };
  }

  /**
   * 是否上架商品
   * @param record
   * @returns {Promise<void>}
   */
  const handleLockGood = async (record) => {
    const response = await lockGood(record.id, Number(!record.is_on));
    if (response.code === 200) {
      message.success('操作成功');
    } else {
      message.success('操作失败');
    }
  }

  /**
   * 是否推荐商品
   * @param record
   * @returns {Promise<void>}
   */
  const handleRecommendGood = async (record) => {
    const response = await isRecommendGood(record.id, Number(!record.is_recommend));
    if (response.code === 200) {
      message.success('操作成功');
    } else {
      message.success('操作失败');
    }
  }

  /**
   * 控制对话框显示和隐藏
   * @returns {Promise<void>}
   */
  const isShowModal = async (show, id) => {
    setEditId(undefined);
    setIsModalVisible(show);
    if(id) setEditId(id);
  }

  const columns = [
    {
      title: '商品图',
      dataIndex: 'cover',
      hideInSearch: true,
      render: (_, record) => <Image
        width={50}
        src={record.cover}
        placeholder={
          <Image
            preview={false}
            src={record.cover}
            width={200}
          />
        }
      />
    },
    {
      title: '类别',
      dataIndex: 'title',
    },
    {
      title: '商品名称',
      dataIndex: 'description',
    },
    {
      title: '价格',
      dataIndex: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
    },
    {
      title: '销量',
      dataIndex: 'sales',
    },
    {
      title: '是否上架',
      dataIndex: 'is_on',
      render: (_, record) => <Switch
        key="switch"
        checkedChildren="已上架"
        unCheckedChildren="未上架"
        defaultChecked={record.is_on === 1}
        onChange={() => handleLockGood(record)}
      />,
      valueType: 'radioButton',
      valueEnum: {
        1: {text: '已上架'},
        0: {text: '未上架'}
      }
    },
    {
      title: '是否推荐',
      dataIndex: 'is_recommend',
      render: (_, record) => <Switch
        key="switch"
        checkedChildren="已推荐"
        unCheckedChildren="未推荐"
        defaultChecked={record.is_recommend === 1}
        onChange={() => handleRecommendGood(record)}
      />,
      valueType: 'radioButton',
      valueEnum: {
        1: {text: '已推荐'},
        0: {text: '未推荐'}
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      render: (_, record) => <a key="editable" onClick={() => isShowModal(true, record.id)}>编辑</a>,
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer key="PageContainer">
      <ProTable
        key="protable"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}) => getData(params)}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="商品列表"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined/>} type="primary" onClick={() => isShowModal(true)}>
            新建
          </Button>,
        ]}
      />

      {
        isModalVisible ?
          <CreateOrEdit
            isModalVisible={isModalVisible}
            isShowModal={isShowModal}
            actionRef={actionRef}
            editId={editId}
          />
          : ''
      }
    </PageContainer>
  );
};

export default Index;
