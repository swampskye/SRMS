import React, { useState, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import axios from 'axios';


const { Option } = Select;

interface MyProps {
    id: string,
    text?: string
}

const App: React.FC<MyProps> = (props) => {




    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/' + props.id + '/')
            .then(response => {
                setUser(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);




    const onFinish = (values: any) => {
        axios.put('http://127.0.0.1:8000/api/user/' + props.id + '/', {
            'phone': values.phone,
            'staff_id': values.staff_id,
            'email': values.email,
            'username': values.username,
        })
            .then(response => {
                setUser(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    };



    const [user, setUser] = useState({
        staff_id: '',
        phone: '',
        email: '',
        is_admin: '',
        username: ''
    })




    return (
        <>
            <Button size={"small"} onClick={showDrawer}>
                {props.text}
            </Button>
            <Drawer
                title="Create a new account"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            // extra={
            //     <Space>
            //         <Button onClick={onClose}>Cancel</Button>
            //         <Button onClick={onFinish} type="primary">
            //             Submit
            //         </Button>
            //     </Space>
            // }
            >
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={user}
                >
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
                                name="phone"
                                label="Phone Number"
                                rules={[{ required: true, message: 'Please enter your Phone Number' }]}
                            >
                                <Input placeholder="Please enter your Phone Number" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Update
                    </Button>



                    {/* <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="approver"
                                label="Approver"
                                rules={[{ required: true, message: 'Please choose the approver' }]}
                            >
                                <Select placeholder="Please choose the approver">
                                    <Option value="jack">Jack Ma</Option>
                                    <Option value="tom">Tom Liu</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="dateTime"
                                label="DateTime"
                                rules={[{ required: true, message: 'Please choose the dateTime' }]}
                            >
                                <DatePicker.RangePicker
                                    style={{ width: '100%' }}
                                    getPopupContainer={(trigger) => trigger.parentElement!}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="description"
                                label="Description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'please enter url description',
                                    },
                                ]}
                            >
                                <Input.TextArea rows={4} placeholder="please enter url description" />
                            </Form.Item>
                        </Col>
                    </Row> */}
                </Form>
            </Drawer>
        </>
    );
};

export default App;