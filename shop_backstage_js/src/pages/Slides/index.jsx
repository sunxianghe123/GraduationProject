import React, {useRef, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, Image, Switch, message} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import {getSlides, changeSlideStatus} from "@/services/slides";
import CreateOrEdit from "@/pages/Slides/components/CreateOrEdit";

const Index = () => {
  let [isModalVisible, setIsModalVisible] = useState(false);
  // let [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  let [editId, setEditId] = useState(undefined);

  // 表格的ref，便于自定义操作表格
  const actionRef = useRef();

  /**
   * 获取轮播图列表数据
   * @param params
   * @returns {Promise<{total: *, data: *, success: boolean}>}
   */
  const getData = async (params) => {
    let response = (await getSlides(params))['data'];
    response = response.map((item)=>{
      item.img = item.img ? JSON.parse(item.img) : item.img;
      return item;
    })
    return {
      data: response,
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response?.pagination?.total,
    };
  }

  /**
   * 是否启用轮播图
   * @param record
   * @returns {Promise<void>}
   */
  const handleSlideStatus = async (record) => {
    const response = await changeSlideStatus(record.id, Number(!record.status));
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
      title: '轮播图',
      dataIndex: 'img',
      hideInSearch: true,
      render: (_, record) => {
        return <Image
          width={50}
          src={record?.img?.[0]?.thumbUrl}
          placeholder={
            <Image
              preview={false}
              src={record?.img?.[0]?.thumbUrl}
              width={200}
            />
          }
        />
      }
    },
    {
      title: '图片名',
      dataIndex: 'title',
    },
    {
      title: '链接地址',
      dataIndex: 'url',
      hideInSearch: true,
    },
    {
      title: '排序',
      dataIndex: 'seq',
    },
    {
      title: '是否启用',
      dataIndex: 'status',
      render: (_, record) => <Switch
        key="switch"
        checkedChildren="已启用"
        unCheckedChildren="未启用"
        defaultChecked={record.status === 1}
        onChange={() => handleSlideStatus(record)}
      />,
      valueType: 'radioButton',
      valueEnum: {
        1: {text: '已启用'},
        0: {text: '未启用'}
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
        headerTitle="轮播图列表"
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
