import React, {useRef, useState} from 'react';
import {PageContainer} from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import {Button, Avatar, Switch, message} from "antd";
import {PlusOutlined, EllipsisOutlined, UserOutlined} from '@ant-design/icons';
import {getUsers, lockUser} from "@/services/user";
// import Create from "@/pages/UserManage/components/Create";
// import Edit from "@/pages/UserManage/components/Edit";
import CreateOrEdit from "@/pages/UserManage/components/CreateOrEdit";

const Index = () => {
  let [isModalVisible, setIsModalVisible] = useState(false);
  // let [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  let [editId, setEditId] = useState(undefined);

  // 表格的ref，便于自定义操作表格
  const actionRef = useRef();

  /**
   * 获取用户列表数据
   * @param params
   * @returns {Promise<{total: *, data: *, success: boolean}>}
   */
  const getData = async (params) => {
    const response = await getUsers(params);

    return {
      data: response?.data,
      success: true,
      // 不传会使用 data 的长度，如果是分页一定要传
      total: response?.pagination?.total,
    };
  }

  /**
   * 封禁和启用用户
   * @param record
   * @returns {Promise<void>}
   */
  const handleLockUser = async (record) => {
    const response = await lockUser(record.user_id, Number(!record.is_locked));
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
  const isShowModal = async (show, user_id) => {
    setEditId(undefined);
    setIsModalVisible(show);
    if(user_id) setEditId(user_id);
  }
  // /**
  //  * 控制编辑框显示和隐藏
  //  * @returns {Promise<void>}
  //  */
  // const isShowModalEdit = async (show, user_id) => {
  //   setIsModalVisibleEdit(show);
  //   setEditId(user_id);
  // }

  /**
   * 打开添加用户表单
   * @returns {Promise<void>}
   */
  const openAddUser = async () => {
    setIsModalVisible(true);
  }


  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInSearch: true,
      render: (_, record) => <Avatar key="avatar" src={record.avatar} size={32} icon={<UserOutlined/>}/>
    },
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '是否禁用',
      dataIndex: 'is_locked',
      hideInSearch: true,
      render: (_, record) => <Switch
        key="switch"
        checkedChildren="启用"
        unCheckedChildren="禁用"
        defaultChecked={record.is_locked === 0}
        onChange={() => handleLockUser(record)}
      />
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      hideInSearch: true,
    },
    {
      title: '操作',
      render: (_, record) => <a key="editable" onClick={() => isShowModal(true, record.user_id)}>编辑</a>
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
        headerTitle="用户列表"
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

      {/*<Create*/}
      {/*  isModalVisible={isModalVisible}*/}
      {/*  isShowModal={isShowModal}*/}
      {/*  actionRef={actionRef}*/}
      {/*/>*/}
      {/*{*/}
      {/*  isModalVisibleEdit ?*/}
      {/*    <Edit*/}
      {/*      isModalVisible={isModalVisibleEdit}*/}
      {/*      isShowModal={isShowModalEdit}*/}
      {/*      actionRef={actionRef}*/}
      {/*      editId={editId}*/}
      {/*    />*/}
      {/*    : ''*/}
      {/*}*/}
    </PageContainer>
  );
};

export default Index;
