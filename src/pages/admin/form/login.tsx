import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Card, Space, Checkbox } from 'antd';
import React, { useEffect, useState } from 'react';

const Index: React.FC = () => {
  const [form] = Form.useForm();
  //   const [, forceUpdate] = useState({});

  // To disable submit button at the beginning.
  //   useEffect(() => {
  //     forceUpdate({});
  //   }, []);
  //   const [values, setValues] = useState({});
  const onFinish = (values: any) => {
    console.log('Finish:', values);
  };
  const fn = () => {
    // console.log(form);
    // console.log(form.getFieldValue('username'));
    // console.log(form.getFieldsError());
    // console.log(form.getFieldError('username'));
    // console.log(form.isFieldsTouched());
    // console.log(form.isFieldTouched('username'));
    // form.resetFields();
    // setValues({ username: 'zhangsan', password: 123 });
    form.setFieldsValue({
      username: 'zhangsan',
      password: 123,
    });
  };

  return (
    <Space direction="vertical" style={{ display: 'flex' }}>
      <Card title="登录行内表单">
        <Form
          form={form}
          name="horizontal_login"
          layout="inline"
          onFinish={onFinish}
          initialValues={{}}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
              // { max: 8, message: '长度有问题' },
              // {
              //   pattern: /^1[3456789]\d{9}$/,
              //   message: '手机号有问题',
              // },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </Form>
        <Form.Item>
          <Button type="primary" onClick={fn}>
            Log in
          </Button>
        </Form.Item>
      </Card>
      <Card>
        {' '}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          style={{ width: 250 }}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </Card>
    </Space>
  );
};

export default Index;
