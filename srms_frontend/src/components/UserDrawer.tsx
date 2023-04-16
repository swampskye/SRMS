import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
// import axios from 'axios';
import axios from '../utils/request'
import cookie from 'react-cookies'



const { Option } = Select;

interface MyProps {
    // id: string,
    text?: string
}

const App: React.FC<MyProps> = (props) => {




    const [user, setUser] = useState({
        id: '',
        phone: '',
        email: '',
        isAdmin: null,
        isActive: null,
        username: '',
        img: '',
        shortIntro: ''
    })

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        axios.get('http://127.0.0.1:8080/user/info', {
            params: { "token": cookie.load("token") }
        }).then(res => {
            // console.log("获取userinfo", res.data)
            setUser(res.data.data)
        }).catch(err => {
            console.log('error:', err.message);
        });
    }, []);


    const onFinish = (values: any) => {
        axios.put('http://127.0.0.1:8080/user/update', {
            'username': values.username,
            'phone': values.phone,
            'email': values.email,
            'shortIntro': values.shortIntro,
        })
            .then(response => {
                setUser(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <>
            <Button size={"small"} onClick={showDrawer}>
                {props.text}
            </Button>
            <Drawer
                title="Update your profile"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={user}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="username"
                                label="Username"
                                rules={[{ required: true, message: 'Please enter your Username' }]}
                            >
                                <Input placeholder="Please enter your Username" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please enter your Email' }]}
                            >
                                <Input placeholder="Please enter your Email" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter your Phone Number' }]}
                            >
                                <Input placeholder="Please enter your Phone Number" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="shortIntro"
                                label="Short Introduction"
                                rules={[{ required: false }]}
                            >
                                <Input placeholder="Write something about yourself" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Update
                    </Button>
                </Form>
            </Drawer>
        </>
    );
};

export default App;