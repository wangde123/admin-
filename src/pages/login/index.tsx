import { FC, useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { getKeyApi, loginApi } from '@/untils/api';
import { history } from 'umi';
import jsencrypt from 'jsencrypt';

const Index: FC = () => {
  const [publicKey, setPublicKey] = useState('');
  useEffect(() => {
    (async () => {
      const res = await getKeyApi();

      setPublicKey(res.publicKey);
    })();
  }, []);
  const jsen = new jsencrypt();
  const onFinish = async (values: any) => {
    jsen.setPublicKey(publicKey);
    const info = jsen.encrypt(JSON.stringify(values));
    const res = await loginApi({ info });
    if (res) {
      message.success('登录成功');
      localStorage.setItem('token', res.token);
      localStorage.setItem('auth', JSON.stringify(res.auth));
      history.push('/admin');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>登录页面</h3>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
