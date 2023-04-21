import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card, Switch } from 'antd';
import { IdcardOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';
// import { notify } from '../components/Notification'
import { notification } from 'antd'
const Signup: React.FC = () => {

  const navigator = useNavigate()
  const submit = (form: any) => {
    if (form.r_password != form.password) {
      notification.error({
        description: 'The two passwords are different. Please enter your password again',
        message: 'Error',
      });
    } else {
      axios.post('http://localhost:8080/user/signup/', {
        'username': form.username,
        "phone": form.phone,
        "email": form.email,
        "password": form.password,
        "isAdmin": form.isAdmin
      }).then(res => {
        // console.log('res.data:', res.data);
        if (res.data.code === 20000) {
          //跳转到登录
          notification.success({
            description: 'Signup successfully',
            message: 'Success',
          });
          navigator('/signin')
        }
      }).catch(err => {
        notification.error({
          description: 'Signup Failed',
          message: 'Error',
        });
        console.log(err.message)
      });
    }
  }



  const onFinish = (values: any) => {
    submit(values)
  };

  return (
    <Row style={{ marginTop: "5%" }}>
      <Col span={6} offset={9}>
        <Card title="Sign Up" bordered={true} style={{ margin: "auto" }}>
          <Form
            name="normal_login"
            className="login-form"
            layout='vertical'
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
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please input your Phone Number!' }]}
            >
              <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: 'Please input your Email!' }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
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
            <Form.Item
              name="r_password"
              label="Confirm Password"
              rules={[{ required: true, message: 'Please confirm your Password!' }]}
            >
              <Input prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password" />
            </Form.Item>

            <Form.Item label="Admin OR NOT"
              name="isAdmin"
              valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Signup
              </Button>
              OR <Link to="/signin">Signin now!</Link>
            </Form.Item>
          </Form>
        </Card >
      </Col >
      <Col span={9}></Col>
    </Row >
  );
};

export default Signup;