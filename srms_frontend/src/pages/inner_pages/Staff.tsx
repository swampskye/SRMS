import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Col, Row, Card, Popover } from 'antd';
import type { ColumnsType } from 'antd/es/table';
// import axios from 'axios'
import axios from '../../utils/request'
import ServerDrawer from '../../components/ServerDrawer'
import FixDrawer from '../../components/FixDrawer'
// import { useNavigate } from 'react-router-dom';
import cookie from 'react-cookies'



interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

// const navigator = useNavigate


let username: string
let isAdmin: boolean

const content = (
    <div>
        <p>fixInfo</p>
        <p>description</p>
    </div>
);


const columns: ColumnsType<DataType> = [
    // const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 200,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Username',
        dataIndex: 'username',
        key: 'username',
        width: 100,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Phone Number',
        dataIndex: 'phone',
        key: 'phone',
        width: 100,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: 150,

        // render: (text: string) => <a>{text}</a>,
    },
    // {
    //     title: 'Created Date',
    //     dataIndex: 'createdDate',
    //     key: 'createdDate',
    // },
    // {
    //     title: 'Is Active?',
    //     dataIndex: 'isActive',
    //     key: 'isActive',
    //     width: 100,
    //     render: (isActive: boolean) => <p>{isActive ? '✅' : '❌'}</p>,
    // },
    {
        title: 'Role',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        width: 200,
        render: (isAdmin: boolean) => <p>{isAdmin ? '👩🏻‍💻Admin🧑🏻‍💻' : '🙎🏻‍♀️Regular User🙎🏻‍♂️'}</p>,
    },

];



function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        getUserRole()
        getServerList()
    }, []);



    async function getUserRole() {
        axios.get('http://127.0.0.1:8080/user/info', {
            params: { "token": cookie.load("token") }
        }).then(res => {
            console.log("获取data:", res.data.data)
            console.log("获取username和isAdmin:", res.data.data.username, res.data.data.isAdmin)
            // setUser(res.data.data)
            username = res.data.data.username
            isAdmin = res.data.data.isAdmin
        }).catch(err => {
            console.log('error:', err.message);
        });
    }


    const getServerList = () => {
        axios.get('http://127.0.0.1:8080/user/all')
            .then(response => {
                console.log(response.data)
                setData(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    const getFailedServerList = () => {
        axios.get('http://127.0.0.1:8080/server/failed')
            .then(response => {
                console.log(response.data)
                setData(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }



    const getIssuedServerList = () => {
        axios.get('http://127.0.0.1:8080/server/issued')
            .then(response => {
                console.log(response.data)
                setData(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }







    return (
        <Col span={20} offset={2}>
            <Space align="center" direction='vertical'>
                <h1 style={{ textAlign: "center" }}>Staff Table</h1>
                <Table rowKey="id" columns={columns} dataSource={data} scroll={{ y: 450 }} />
            </Space>
        </Col >
    )
}

export default App;