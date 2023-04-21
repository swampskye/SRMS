import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Switch } from 'antd';
import axios from '../utils/request'
import { notification } from 'antd'

const { Option } = Select;
const { TextArea } = Input;

interface MyProps {
    serverIndex: string,
    username: string,
    text: string
}

const App: React.FC<MyProps> = (props) => {

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const sendFix = (fixId: string, serverIndex: string) => {
        axios.put('http://127.0.0.1:8080/server/upfixid', {
            "fixId": fixId,
            "serverIndex": serverIndex
        })
            .then(response => {
                console.log("addddddd fix to server details")

                console.log(response.data)
            })
            .catch(error => {
                notification.error({
                    description: 'Issue Updated Failed',
                    message: 'Error',
                });
                console.log(error);
            });
    }



    const onFinish = (values: any) => {
        axios.post('http://127.0.0.1:8080/fix/add', {
            // "serverIndex": server.serverIndex,
            "sender": props.username,
            "serverIndex": props.serverIndex,
            "fixStatus": values.fixStatus,
            "info": values.info
        })
            .then(response => {
                console.log(response.data)
                console.log('fix_id ----------- ', response.data.data.id)
                const fixID = response.data.data.id
                sendFix(fixID, props.serverIndex)
                notification.success({
                    description: 'Issue Update successfully',
                    message: 'Success',
                });
            })
            .catch(error => {
                notification.error({
                    description: 'Issue Updated Failed',
                    message: 'Error',
                });
                console.log(error);
            });
    };

    return (
        <>
            <Button type="primary" size={"small"} icon={<EditOutlined />} onClick={showDrawer}>
                {props.text}
            </Button>
            <Drawer
                title="Raise An Issue"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <h1>{props.serverIndex}</h1>
                <h1>{props.username}</h1>
                <Form layout="vertical"
                    hideRequiredMark
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item name="fixStatus" label="Problem Type" rules={[{ required: true }]}>
                                <Select
                                    placeholder="Select A Problem Type"
                                    // onChange={onGenderChange}
                                    allowClear
                                >
                                    <Option value="1">Problem Type 1</Option>
                                    <Option value="2">Problem Type 2</Option>
                                    <Option value="3">Problem Type 3</Option>
                                    <Option value="4">Problem Type 4</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="info"
                                label="Fix Information"
                                rules={[{ required: true, message: 'Fix Information' }]}
                            >
                                <TextArea rows={4} />
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