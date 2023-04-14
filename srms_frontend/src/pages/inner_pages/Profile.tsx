import { Avatar, Badge, Button, Col, Descriptions, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import UserDrawer from "../../components/UserDrawer";
// import axios from "axios";
import axios from '../../utils/request'
import { useNavigate } from "react-router-dom";
import cookie from 'react-cookies'
export default function Profile() {




    const navigator = useNavigate()
    const logout = () => {
        cookie.remove("token", { path: "/" })
        localStorage.clear()
        navigator('/signin')
    }

    const [user, setUser] = useState({
        // staff_id: '',
        id: '',
        phone: '',
        email: '',
        isAdmin: null,
        isActive: null,
        username: '',
        img: '',
        shortIntro: ''
    })


    useEffect(() => {
        axios.get('http://127.0.0.1:8080/user/info', {
            params: { "token": cookie.load("token") }
        }).then(res => {
            console.log("获取userinfo", res.data)
            setUser(res.data.data)
        }).catch(err => {
            console.log('error:', err.message);
        });
    }, []);



    return (
        <div>
            <Row style={{ marginTop: "150px" }}>
                <Col span={8} style={{ backgroundColor: "" }}>
                    <Space align="center" direction={"vertical"} style={{ marginLeft: "25%" }}>
                        <Avatar style={{ backgroundColor: "#ffbf00", verticalAlign: 'middle', }}
                            size={{ xs: 24, sm: 80, md: 150, lg: 200, xl: 300, xxl: 300 }}
                            gap={4}>
                            {user.username}
                        </Avatar>
                        <div>
                            <Space>
                                <UserDrawer text={"Edit Profile"}></UserDrawer>
                                <Button size="small" onClick={logout} danger>Exit Account</Button>
                            </Space>
                        </div>
                    </Space>
                </Col>
                <Col span={14}>
                    <Descriptions title="User Info" bordered>
                        <Descriptions.Item label="User ID" span={3}>{user.id}</Descriptions.Item>
                        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Admin or Student" span={2}>
                            {user.isAdmin === true ? <Badge status="error" text="Admin" /> : <Badge status="success" text="Studnet" />}
                        </Descriptions.Item>
                        <Descriptions.Item label="Phone" span={1}>
                            {user.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email" span={2}>{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Short Introduction" span={3}>{user.shortIntro === '' ? "Write down something" : user.shortIntro}</Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}

