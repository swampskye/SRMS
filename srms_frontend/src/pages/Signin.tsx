import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card } from 'antd';
import axios from 'axios';
import cookie from 'react-cookies'
import { notification } from 'antd';

// import { notify } from '../components/Notification'

const Signin: React.FC = () => {




    const navigator = useNavigate()

    function signin(form: any) {
        axios.post('http://127.0.0.1:8080/user/signin', {
            "username": form.username,
            "password": form.password
        }).then(res => {
            console.log("signin function!!!!!!!!!!")
            console.log("res.data:", res.data.data)
            console.log("new api signin data:", res.data.data.token)
            cookie.save("token", res.data.data.token, { path: "/" })
            console.log(cookie.load("token"))

            notification.success({
                description: 'Signin successfully',
                message: 'Success',
            });
            console.log("登录成功！");

        }).catch(err => {
            // alert("登录失败")
            notification.error({
                description: 'Signin Failed',
                message: 'Error',
            });
            console.log('error:', err.message);
        });
    }

    function getinfo() {
        axios.get('http://127.0.0.1:8080/user/info', {
            params: { "token": cookie.load("token") }
        }).then(res => {
            console.log("getinfo function!!!!!!!!!!")
            console.log("获取username:", res.data.data.username)
            localStorage.setItem('username', res.data.data.username)
            localStorage.setItem('isAdmin', res.data.data.isAdmin === true ? "true" : "")
            navigator("/")

        }).catch(err => {
            console.log('error:', err.message);
        });
    }



    function submit(form: any) {
        signin(form)
        setTimeout(() => {
            getinfo()
        }, 300);
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
                            name="username"
                            label="Username"
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

                            {/* <a className="login-form-forgot" href="">
                                Forgot password
                            </a> */}
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