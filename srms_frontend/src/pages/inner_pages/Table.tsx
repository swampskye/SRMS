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


    id: string;
    serverIndex: string;
    isWorking: boolean;
    descriptions: string;
    createdDate: Date;
    fixId: string;
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
        render: (fixId: string) => fixId == null ? "there is no isuee" :
            <Popover content={content} title="Title">
                <Button type="primary" size={"small"} danger>Show Fix Info</Button>
            </Popover>
        // render: (serverIndex: string) => isAdmin == true ? <ServerDrawer serverIndex={serverIndex} text={"Edit Detail"}></ServerDrawer> : <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer>
    },
    {
        title: 'Operations',
        dataIndex: 'serverIndex',
        // dataIndex: 'id',
        key: 'operations',
        // render: (serverIndex: string, row) => isAdmin ? <ServerDrawer serverIndex={serverIndex} username={username} text={"Edit Detail"}></ServerDrawer> : <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer>
        render: (serverIndex: string, row) => {
            if (isAdmin) {
                return <ServerDrawer serverIndex={serverIndex} username={username} text={"Edit Detail"}></ServerDrawer>
            } else if (row.fixId == null) {
                return <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer>
            } else {
                return <span>Issue is being handled</span>
            }
        }
    }
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
                <h1 style={{ textAlign: "center" }}>Server Table</h1>
                <Table rowKey="id" columns={columns} dataSource={data} scroll={{ y: 450 }} />
            </Space>

            <Space>
                <Button size="small" onClick={getServerList} type='primary'>Show All</Button>
                <Button size="small" onClick={getFailedServerList} type='primary'>Show Failed</Button>
                <Button size="small" onClick={getIssuedServerList} type='primary'>Show Issued</Button>
            </Space>
        </Col >
    )
}

export default App;