import React, { useState } from 'react';
import { Breadcrumb, Layout, Menu, theme, Row } from 'antd';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd';
import {
    CloudServerOutlined,
    TableOutlined,
    ToolOutlined,
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
    getItem(<Link to="/show">Show</Link>, 'show', <CloudServerOutlined />),
    getItem(<Link to="/table">Table</Link>, 'table', <TableOutlined />),
    getItem(<Link to="/fix">Fix</Link>, 'fix', <ToolOutlined />),
    getItem(<Link to="/profile">Profile</Link>, 'profile', <UserOutlined />),
    // getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
];



const Main: React.FC = () => {

    const contentStyle: React.CSSProperties = {
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#108ee9',
    };

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
            <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%' }}>
                <div className="logo">
                    {/* <img src="../logo.png" alt="" style={{ margin: "auto" }} /> */}
                </div>
                <Menu
                    onClick={onClick}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[page]}
                    items={items}
                />
            </Header>
            <Content>
                {/* <div style={{ background: colorBgContainer, width: "100%" }}> */}
                <Outlet />
                {/* </div> */}
            </Content>
            <Footer style={{ textAlign: 'center', background: "gray", position: 'fixed', bottom: 0, zIndex: 1, width: '100%' }}>SRMS ©2023 Created by Zetian Zhao</Footer>
        </Layout >
    );
};

export default Main;