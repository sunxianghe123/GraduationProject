import React, {useEffect, useState} from 'react';
import {PageContainer} from '@ant-design/pro-layout';
import {Statistic, Card, Row, Col} from 'antd';
// import {ArrowUpOutlined, ArrowDownOutlined} from '@ant-design/icons';
import {getCountArr} from "@/services/dashboard";

const Dashboard = () => {
  // 定义组件状态，状态改变，会引起组件重新渲染
  let [data, setData] = useState({});

  useEffect(async () => {
    // 发送请求，获取统计数据
    const result = await getCountArr();
    // 得到数据之后，更新请求状态
    setData(result['list']);
  }, []);
  return (
    <PageContainer>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic
              title="用户数"
              value={data?.users_count}
              valueStyle={{color: '#3f8600'}}
              // prefix={<ArrowUpOutlined />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="商品数"
              value={data?.goods_count}
              valueStyle={{color: '#cf1322'}}
              // prefix={<ArrowDownOutlined />}
              // suffix="%"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="订单数"
              value={data?.orders_count}
              valueStyle={{color: '#13b9cf'}}
              // prefix={<ArrowDownOutlined />} 前缀
              // suffix="%" 后缀
            />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default Dashboard;
