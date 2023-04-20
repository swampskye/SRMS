import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space, Switch, } from 'antd';
import axios from '../utils/request'
import cookie from 'react-cookies'


interface MyProps {
    text?: string,
    serverIndex: string
    username: String
}

const { Option } = Select;
const { TextArea } = Input;


const App: React.FC<MyProps> = (props) => {


    const [form] = Form.useForm();
    // console.log(props.id)
    // console.log(props.text)

    // const [text, setText] = useState(Props.text)


    const [server, setServer] = useState({
        id: '',
        isWorking: '',
        descriptions: '',
        CreatedDate: '',
        serverIndex: '',
        fixId: '',
    })

    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8080/server/info', {
            params: { "serverIndex": props.serverIndex }
        }).then(res => {
            console.log("获取serverinfo", res.data)
            setServer(res.data.data)
            console.log("*************server", server)
        }).catch(err => {
            console.log('error:', err.message);
        });
    }, []);

    const onFinish = (values: any) => {
        axios.put('http://127.0.0.1:8080/server/update', {
            "isWorking": values.isWorking,
            "descriptions": values.descriptions,
            "serverIndex": props.serverIndex,
            "username": props.username
            // }, params: {}
        })
            .then(response => {
                setServer(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    };


    return (
        <>
            <Button type="primary" size={"small"} icon={<EditOutlined />} onClick={showDrawer}>
                {props.text}
            </Button>
            <Drawer
                title="Update Server Details"
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}
            // extra={
            //     <Space>
            //         <Button onClick={onClose}>Cancel</Button>
            //         <Button onClick={onClose} type="primary">
            //             Submit
            //         </Button>
            //     </Space>
            // }
            >
                <Form layout="vertical"
                    hideRequiredMark
                    form={form}
                    onFinish={onFinish}
                    initialValues={server}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Status" name="isWorking" valuePropName='checked'>
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="descriptions"
                                label="Description"
                                rules={[{ required: true, message: 'description' }]}
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