import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumb, Layout, Menu, theme, Row } from 'antd';
import { Outlet, useNavigate, Link, useLocation } from 'react-router-dom'
import type { MenuProps } from 'antd';
import axios from '../utils/request'
import cookie from 'react-cookies'

import {
    CloudServerOutlined,
    TableOutlined,
    ToolOutlined,
    UserOutlined,
    TeamOutlined
} from '@ant-design/icons';
import { type } from 'os';
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

// let username: string
// let isAdmin: boolean

// let username: any
// let isAdmin: any



const items_admin: MenuItem[] = [
    getItem(<Link to="/show">Show</Link>, 'show', <CloudServerOutlined />),
    getItem(<Link to="/table">Server</Link>, 'table', <TableOutlined />),
    getItem(<Link to="/fix">Fix</Link>, 'fix', <ToolOutlined />),
    getItem(<Link to="/staff">Staff</Link>, 'staff', <TeamOutlined />),
    getItem(<Link to="/profile">Profile</Link>, 'profile', <UserOutlined />),
];
const items_ruser: MenuItem[] = [
    getItem(<Link to="/show">Show</Link>, 'show', <CloudServerOutlined />),
    getItem(<Link to="/table">Table</Link>, 'table', <TableOutlined />),
    getItem(<Link to="/profile">Profile</Link>, 'profile', <UserOutlined />),
];



const Main: React.FC = () => {


    const username = localStorage.getItem('username')
    const isAdmin: boolean = Boolean(localStorage.getItem('isAdmin'))

    useEffect(() => {
        console.log('username and isAdmin:---------', username, isAdmin)
        console.log('username and isAdmin:---------', typeof (username), username, typeof (isAdmin), isAdmin)


        // getUserRole()
    }, [])


    // async function getUserRole() {
    //     axios.get('http://127.0.0.1:8080/user/info', {
    //         params: { "token": cookie.load("token") }
    //     }).then(res => {
    //         console.log("获取当前user:", res.data.data)
    //         // setUser(res.data.data)
    //         // username = res.data.data.username
    //         // isAdmin = res.data.data.isAdmin
    //         // username = localStorage.getItem('username')
    //         // isAdmin = localStorage.getItem('isAdmin')
    //         console.log("-------------------------------------:", username, isAdmin)

    //     }).catch(err => {
    //         console.log('error:', err.message);
    //     });
    // }

    // const contentStyle: React.CSSProperties = {
    //     textAlign: 'center',
    //     minHeight: 120,
    //     lineHeight: '120px',
    //     color: '#fff',
    //     backgroundColor: '#108ee9',
    // };

    // const {
    //     token: { colorBgContainer }, 
    // } = theme.useToken();

    const { pathname } = useLocation(); //用useLocation中的pathname获取当前页面的url，得到的是 /xxx
    const newpathname = pathname.replace('/', '') //去掉 /
    const [page, setPage] = useState(newpathname)

    const onClick: MenuProps['onClick'] = (e) => {
        console.log(e.key)
        setPage(e.key)
    }


    return (
        <Layout className="layout">
            <Header style={{ textAlign: 'center', position: 'sticky', backgroundColor: "#001529", top: 0, zIndex: 1, width: '100%', padding: "0" }}>
                {/* <div className="logo">
                <img src="../logo.png" alt="" style={{ margin: "auto" }} />
            </div> */}
                <Menu
                    onClick={onClick}
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[page]}
                    items={(isAdmin === true) ? items_admin : items_ruser}

                />
            </Header>
            <Content style={{ backgroundColor: "white", height: "70%" }}>
                {/* <div style={{ background: colorBgContainer, width: "100%" }}> */}
                <Outlet />
                {/* </div> */}
            </Content>
            <Footer style={{ textAlign: 'center', position: 'fixed', bottom: 0, height: "5%", width: '100%' }}>SRMS ©2023 Created by Zetian Zhao</Footer>
        </Layout >
    );
};

export default Main;