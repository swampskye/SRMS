import React from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Col, Row, Card } from 'antd';
import { IdcardOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import axios from 'axios';

const Signup: React.FC = () => {

  const navigator = useNavigate()

  // useEffect(() => {
  //   axios.get('http://127.0.0.1:8080/user/info', {
  //     params: { "token": cookie.load("token") }
  //   }).then(res => {
  //     console.log("获取userinfo", res.data)
  //     setUser(res.data.data)
  //   }).catch(err => {
  //     console.log('error:', err.message);
  //   });
  // }, []);


  const submit = (form: any) => {

    if (form.r_password != form.password) {
      alert("The two passwords are different. Please enter your password again")
    } else {
      axios.post('http://localhost:8080/user/signup/', {
        'username': form.username,
        // 'staff_id': form.staff_id,
        "phone": form.phone,
        "email": form.email,
        "password": form.password,
        // "is_admin": 'student'
      }).then(res => {
        console.log('res.data:', res.data);
        if (res.data.code === 20000) {
          //跳转到登录
          alert("stu注册成功")
          navigator('/signin')
          console.log("stu注册成功")
        }
        // if (res.data.code === 500) {
        //   console.log('status: 500')
        // }
        // if (res.data.code === 201) {
        //   console.log('status: 201')
        // }
      }).catch(err => {
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
            {/* <Form.Item
              name="staff_id"
              label="Staff ID"
              rules={[{ required: true, message: 'Please input your Staff ID!' }]}
            >
              <Input prefix={<IdcardOutlined />} placeholder="Staff ID" />
            </Form.Item> */}
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



            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}
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