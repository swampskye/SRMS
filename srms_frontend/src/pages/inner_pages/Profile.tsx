import { Avatar, Badge, Button, Col, Descriptions, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import UserDrawer from "../../components/UserDrawer";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {




    const navigator = useNavigate()
    const logout = () => {
        localStorage.clear()
        navigator('/signin')
    }



    const UsernameList = ['Skye', 'Lucy', 'Tom', 'Edward'];
    const ColorList = ['#ffbf00', '#7265e6', '#ffbf00', '#00a2ae'];
    const GapList = [4, 3, 2, 1];

    const [username, setUsername] = useState(UsernameList[0]);
    const [color, setColor] = useState(ColorList[0]);
    const [gap, setGap] = useState(GapList[0]);

    // const changeUser = () => {
    //     const index = UserList.indexOf(user);
    //     setUser(index < UserList.length - 1 ? UserList[index + 1] : UserList[0]);
    //     setColor(index < ColorList.length - 1 ? ColorList[index + 1] : ColorList[0]);
    // };
    //
    // const changeGap = () => {
    //     const index = GapList.indexOf(gap);
    //     setGap(index < GapList.length - 1 ? GapList[index + 1] : GapList[0]);
    // };

    const [user, setUser] = useState({
        staff_id: '',
        phone: '',
        email: '',
        is_admin: '',
        username: ''
    })

    const token: any = localStorage.getItem("token")
    const user_id: any = localStorage.getItem("user_id")
    const is_admin: any = localStorage.getItem("is_admin")

    useEffect(() => {
        // axios.get('http://127.0.0.1:8000/api/user/user_detail/' + user_id + '/')
        axios.get('http://127.0.0.1:8000/api/user/' + user_id + '/')
            .then(response => {
                setUser(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            <Row style={{ marginTop: "150px" }}>
                <Col span={8} style={{ backgroundColor: "" }}>
                    <Space align="center" direction={"vertical"} style={{ marginLeft: "25%" }}>
                        <Avatar style={{ backgroundColor: color, verticalAlign: 'middle', }}
                            size={{ xs: 24, sm: 80, md: 150, lg: 200, xl: 300, xxl: 300 }}
                            gap={gap}>
                            {user.username}
                        </Avatar>
                        <div>
                            <Space>
                                <UserDrawer id={user_id} text={"Edit Profile"}></UserDrawer>
                                <Button size="small" onClick={logout} danger>Exit Account</Button>
                            </Space>
                        </div>
                    </Space>
                </Col>
                <Col span={14}>
                    <Descriptions title="User Info" bordered>
                        <Descriptions.Item label="Staff ID" span={2}>{user.staff_id}</Descriptions.Item>
                        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
                        <Descriptions.Item label="Phone" span={2}>
                            {user.phone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
                        <Descriptions.Item label="Admin or Student" span={3}>
                            {user.is_admin == 'admin' ? <Badge status="error" text="Admin" /> : <Badge status="success" text="Studnet" />}
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}

