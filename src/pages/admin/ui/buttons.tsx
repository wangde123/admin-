import { Card, Button, Space, Tooltip, notification } from 'antd';
import { useState } from 'react';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from '@ant-design/icons';
// type NotificationType = 'success' | 'info' | 'warning' | 'error';
const openNotificationWithIcon = (
  type: 'success' | 'info' | 'error' | 'warning',
) => {
  notification[type]({
    message: 'Notification Title',
    description:
      'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
  });
};
const Index = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const time = (): void => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Card title="基础按钮">
        <Space>
          <Button type="primary" size="large">
            Primary Button
          </Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
          <Button type="primary" danger>
            Primary
          </Button>
          <Button danger type="dashed">
            Default Button
          </Button>
          <Button type="primary" disabled>
            Primary Button
          </Button>
        </Space>
      </Card>
      <Card title="基础按钮">
        <Space>
          <Button icon={<PlusOutlined />}>添加</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button type="primary" icon={<DeleteOutlined />}>
            删除
          </Button>
          <Tooltip title="">
            <Button shape="circle" icon={<SearchOutlined />} />
          </Tooltip>
        </Space>
      </Card>
      <Card title="Loading...">
        <Space>
          <Button type="primary" loading={loading} onClick={time}>
            Loading
          </Button>
        </Space>
      </Card>
      <Card title="全局通知">
        <Space>
          <Button onClick={() => openNotificationWithIcon('success')}>
            Success
          </Button>
          <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
          <Button onClick={() => openNotificationWithIcon('warning')}>
            Warning
          </Button>
          <Button onClick={() => openNotificationWithIcon('error')}>
            Error
          </Button>
        </Space>
      </Card>
      <Space>
        <img src="http://www.pudge.wang/static/pic.ca60c2c5.png" alt="" />
      </Space>
    </Space>
  );
};
export default Index;
