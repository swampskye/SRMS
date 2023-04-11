import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies'

const Signin: React.FC = () => {




    const navigator = useNavigate()


    // const submit = (form: any) => {
    //     axios.post('http://127.0.0.1:8000/api/signin/', {
    //         "staff_id": form.staff_id,
    //         "password": form.password
    //     }).then(res => {
    //         const token = res.data.access
    //         const user_id = res.data.user_id
    //         const is_admin = res.data.is_admin

    //         localStorage.setItem('token', token)
    //         localStorage.setItem('user_id', user_id)
    //         localStorage.setItem('is_admin', is_admin)
    //         navigator("/show")
    //         console.log("登录成功！");
    //         // console.log(localStorage.getItem('token'))
    //         // console.log(localStorage.getItem('is_admin'))
    //     }).catch(err => {
    //         console.log('error:', err.message);
    //     });
    // }


    const submit = (form: any) => {
        axios.post('http://127.0.0.1:8080/user/signin', {
            "username": form.staff_id,
            "password": form.password
        }).then(res => {
            console.log("new api signin data:", res.data.data.token)
            cookie.save("token", res.data.data.token, { path: "/" })
            console.log(cookie.load("token"))
            navigator("/show")
            console.log("登录成功！");
        }).catch(err => {
            console.log('error:', err.message);
        });
    }


    const onFinish = (values: any) => {
        submit(values)
    };

    return (
        <Row style={{ marginTop: "10%" }}>
            <Col span={6} offset={9}>
                <Card title="Sign In" bordered={true} style={{ margin: "auto" }}>
                    <Form
                        name="normal_login"
                        layout='vertical'
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="staff_id"
                            label="Staff ID"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            label="Password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Signin
                            </Button>
                            Or <Link to="/signup">Signup now!</Link>
                        </Form.Item>
                    </Form>
                </Card >
            </Col >
        </Row >
    );
};

export default Signin;