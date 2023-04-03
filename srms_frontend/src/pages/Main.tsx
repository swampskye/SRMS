import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
const { Header, Content, Footer } = Layout;


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}


const items: MenuItem[] = [
    getItem(<Link to="/show">Show</Link>, 'show', <PieChartOutlined />),
    getItem(<Link to="/table">Table</Link>, 'table', <DesktopOutlined />),
    getItem(<Link to="/fix">Fix</Link>, 'fix', <FileOutlined />),
    getItem(<Link to="/profile">Profile</Link>, 'profile', <UserOutlined />),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];



const Main: React.FC = () => {

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { pathname } = useLocation(); //用useLocation中的pathname获取当前页面的url，得到的是 /xxx
    const newpathname = pathname.replace('/', '') //去掉 /
    const [page, setPage] = useState(newpathname)

    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key)
        setPage(e.key)
    }


    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                <Menu
                    onClick={onClick}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[page]}
                    items={items}
                />
            </Header>
            <Content style={{ padding: '0 50px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="site-layout-content" style={{ background: colorBgContainer }}>
                    <Outlet />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>SwampSkye ©2023 Created by Zetian Zhao</Footer>
        </Layout>
    );
};

export default Main;