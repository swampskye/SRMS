import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Col, Row, Card } from 'antd';
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


const columns: ColumnsType<DataType> = [
    // const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 300,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Index',
        dataIndex: 'serverIndex',
        key: 'index',
        width: 150,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'isWorking',
        key: 'status',
        width: 100,
        render: (isWorking: boolean) => <p>{isWorking ? '✅' : '❌'}</p>,
    },
    {
        title: 'Description',
        dataIndex: 'descriptions',
        key: 'index',
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Created Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: 'Fix Info',
        dataIndex: 'fixId',
        // key: 'createdDate',
        render: (fixId: string) => fixId == null ? "there is no isuee" : <p>{fixId} information about fix</p>
        // render: (serverIndex: string) => isAdmin == true ? <ServerDrawer serverIndex={serverIndex} text={"Edit Detail"}></ServerDrawer> : <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer>
    },
    {
        title: 'Operations',
        dataIndex: 'serverIndex',
        // dataIndex: 'id',
        key: 'operations',
        // render: (serverIndex: string) => isAdmin ? <ServerDrawer serverIndex={serverIndex} text={"Edit Detail"}></ServerDrawer> : <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer>
        render: (serverIndex: string) => isAdmin ? <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer> : < ServerDrawer serverIndex={serverIndex} text={"Edit Detail"} ></ServerDrawer >
    }
];



function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        getServerList()
        getUserRole()
    }, []);

    // const addServer = () => {
    //     axios.post('http://127.0.0.1:8080/server/add', {
    //         // 'description':'default'
    //         'serverIndex': 'cabinet-001'
    //     })
    //         .then(response => {
    //             // setData(response.data);
    //             console.log('addaddaddaddaddadd' + response.data)
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }


    const getServerList = () => {
        axios.get('http://127.0.0.1:8080/server/all')
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

    const getUserRole = () => {
        axios.get('http://127.0.0.1:8080/user/info', {
            params: { "token": cookie.load("token") }
        }).then(res => {
            console.log("获取当前user:", res.data.data)
            console.log("获取username和isAdmin:", res.data.data.username, res.data.data.isAdmin)
            // setUser(res.data.data)
            username = res.data.data.username
            isAdmin = res.data.data.isAdmin
        }).catch(err => {
            console.log('error:', err.message);
        });
    }




    return (
        <Col span={20} offset={2}>
            <Space align="center" direction='vertical'>
                <h1 style={{ textAlign: "center" }}>Server Table</h1>
                <Table rowKey="id" columns={columns} dataSource={data} scroll={{ y: 450 }} />
            </Space>

            <Space>
                <Button size="small" onClick={getServerList} type='primary'>Show All</Button>
                <Button size="small" onClick={getFailedServerList} type='primary'>Show Failed</Button>
            </Space>
        </Col >
    )
}

export default App;