import { Layout, Typography, Space } from 'antd';
import { history } from 'umi';
const { Text, Link } = Typography;
const Index = () => {
  const tuchui = () => {
    localStorage.clear();
    history.push('/login');
  };
  return (
    <>
      <Layout.Header
        className="site-layout-background"
        style={{
          padding: '0 20px',
          textAlign: 'right',
          borderBottom: '2px solid #1da57a',
        }}
      >
        <Space>
          <Text>xxx</Text>
          <Link onClick={tuchui}>退出</Link>
        </Space>
      </Layout.Header>
    </>
  );
};
export default Index;
