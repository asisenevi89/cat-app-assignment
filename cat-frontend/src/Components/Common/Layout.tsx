import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  DatabaseOutlined,
  FileImageOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { SIDEBAR_KEYS } from "../../Utils/Constants";

const { Header, Sider, Content } = Layout;

type props = {
  children?: React.ReactNode
};

type menuObj = {
  key: string,
};

const LayoutWrapper: React.FC<props> = (props, context) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setSelectedKey('1_Home');
  }, []);

  useEffect(() => {
    const { pathname } = location;
    if (pathname === '/') {
      setSelectedKey('1_Home');
      return;
    }

    if (pathname.includes('/image/')) {
      setSelectedKey('3_View_Image');
      return;
    }
    setSelectedKey('2_Image_Gallery');

  }, [location.pathname]);

  const onChangeMenu = (value: menuObj) => {
    const { key } = value;
    setSelectedKey(key);

    switch (key) {
      case (SIDEBAR_KEYS.home):
        navigate('/');
        return;
      case (SIDEBAR_KEYS.gallery):
        navigate('/image-gallery')
        return;
      case (SIDEBAR_KEYS.viewImage):
        navigate(`/image/random`)
        return;
      default:
        navigate('/');
    };
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={['1_Home']}
          theme="dark"
          selectedKeys={[selectedKey]}
          onClick={onChangeMenu}
          items={[
            {
              key: '1_Home',
              icon: <HomeOutlined />,
              label: 'Home',
            },
            {
              key: '2_Image_Gallery',
              icon: <DatabaseOutlined />,
              label: 'Image Gallery',
            },
            {
              key: '3_View_Image',
              icon: <FileImageOutlined />,
              label: 'View Image',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className={selectedKey === SIDEBAR_KEYS.gallery ? "layout-content-gallery" :  "layout-content"}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;