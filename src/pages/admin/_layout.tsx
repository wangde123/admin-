import { Layout, Space } from 'antd';
import React, { useState } from 'react';
import './index.less';
import Menu from './components/Menu';
import Header from './components/Header';
import Nav from './components/Nav';
import { IRouteComponentProps } from 'umi';
const { Content, Footer, Sider } = Layout;

const App = (props: IRouteComponentProps) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="logo" />
        <Menu />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header />
        <Nav />
        <Content style={{ margin: '16px' }}>
          <div style={{ padding: 24, minHeight: 360 }}>{props.children}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
App.wrappers = ['@/wrappers/auth'];

export default App;
