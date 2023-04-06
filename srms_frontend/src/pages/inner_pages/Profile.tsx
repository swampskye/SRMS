import {Avatar, Badge, Button, Col, Descriptions, Row, Space} from "antd";
import React, {useEffect, useState} from "react";
import UserDrawer from "../../components/UserDrawer";
import axios from "axios";

export default function Profile() {

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

    const [user, setUser] = useState([])
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
            <Row style={{marginTop: "150px"}}>
                <Col span={8} style={{backgroundColor: ""}}>
                    <Space align="center" direction={"vertical"} style={{marginLeft: "25%"}}>
                        <Avatar style={{backgroundColor: color, verticalAlign: 'middle',}}
                                size={{xs: 24, sm: 80, md: 150, lg: 200, xl: 300, xxl: 300}}
                                gap={gap}>
                            {username}
                        </Avatar>
                        <UserDrawer id={user_id} text={"Edit Profile"}></UserDrawer>
                    </Space>
                </Col>
                <Col span={14}>
                    <Descriptions title="User Info" bordered>
                        <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
                        <Descriptions.Item label="Billing Mode">Prepaid</Descriptions.Item>
                        <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
                        <Descriptions.Item label="Order time">2018-04-24 18:00:00</Descriptions.Item>
                        <Descriptions.Item label="Usage Time" span={2}>
                            2019-04-24 18:00:00
                        </Descriptions.Item>
                        <Descriptions.Item label="Status" span={3}>
                            <Badge status="processing" text="Running"/>
                        </Descriptions.Item>
                        <Descriptions.Item label="Negotiated Amount">$80.00</Descriptions.Item>
                        <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
                        <Descriptions.Item label="Official Receipts">$60.00</Descriptions.Item>
                        <Descriptions.Item label="Config Info">
                            Data disk type: MongoDB
                            <br/>
                            Database version: 3.4
                            <br/>
                            Package: dds.mongo.mid
                            <br/>
                            Storage space: 10 GB
                            <br/>
                            Replication factor: 3
                            <br/>
                            Region: East China 1
                            <br/>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}

