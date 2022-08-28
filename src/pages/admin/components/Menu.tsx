import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import { history } from 'umi';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

// const items: MenuItem[] = [
//   getItem('首页', '/welcome', <MailOutlined />),

//   getItem('UI', 'sub2', <AppstoreOutlined />, [
//     getItem('按钮', '/ui/buttons'),
//     getItem('弹框', '/ui/frame'),
//     getItem('Loding', '7'),
//     getItem('通知提醒', '8'),
//   ]),

//   getItem('表单', 'sub3', <SettingOutlined />, [
//     getItem('登录', '/form/login'),
//     getItem('注册', '/form/reg'),
//   ]),
//   getItem('表格', '/table', <MailOutlined />, [
//     getItem('基础表格', '/table/basic'),
//   ]),
//   getItem('富文本', '/spans', <MailOutlined />),
//   getItem('城市管理', '/city', <MailOutlined />),
//   getItem('地图', '/map', <MailOutlined />),
// ];
export const arr = [
  {
    title: '首页',
    path: '/welcome',
    icon: <MailOutlined />,
    auth: 1,
  },
  {
    title: 'UI',
    path: 'sub2',
    icon: <AppstoreOutlined />,
    auth: 2,
    children: [
      {
        title: '按钮',
        path: '/ui/buttons',
        auth: 2,
      },
      {
        title: '弹框',
        path: '/ui/frame',
      },
      {
        title: 'Loding',
        path: '7',
      },
      {
        title: '通知提醒',
        path: '8',
      },
    ],
  },
  {
    title: '表单',
    path: 'sub3',
    icon: <SettingOutlined />,
    auth: 3,
    children: [
      {
        title: '登录',
        path: '/form/login',
      },
      {
        title: '注册',
        path: '/form/reg',
      },
    ],
  },
  {
    title: '富文本',
    path: '/spans',
    icon: <MailOutlined />,
    auth: 4,
  },
  {
    title: '城市管理',
    path: '/city',
    icon: <MailOutlined />,
    auth: 5,
  },
  {
    title: '地图',
    path: '/map',
    icon: <MailOutlined />,
    auth: 6,
  },
];
const onClick: MenuProps['onClick'] = (e) => {
  history.push('/admin' + e.key);
};

const Index: React.FC = () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '[]');
  // const auth = localStorage.getItem('auth') || '[]';
  // console.log(auth);

  const items = arr
    .filter((item) => auth.includes(item.auth))
    .map((value) => {
      return getItem(
        value.title,
        value.path,
        value.icon,
        value.children &&
          value.children.map((item) => getItem(item.title, item.path)),
      );
    });
  return <Menu onClick={onClick} mode="vertical" items={items} theme="dark" />;
};

export default Index;
