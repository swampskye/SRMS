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
        title: "Server Index",
        dataIndex: "serverIndex",
        key: "serverIndex",
        width: "200"
    },
    {
        title: 'Issue Sender',
        dataIndex: 'sender',
        key: 'sender',
        width: 150,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Issue Fixer',
        dataIndex: 'fixer',
        key: 'fixer',
        width: 100,
        // render: (isWorking: boolean) => <p>{isWorking ? '✅' : '❌'}</p>,
    },
    {
        title: 'Issue Date',
        dataIndex: 'createdDate',
        key: 'createdDate',
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Issue Type',
        dataIndex: 'fixStatus',
        key: 'fixStatus',
    },
    {
        title: 'Fix Info',
        dataIndex: 'info',
        // key: 'createdDate',
        render: (info: string) => info == null ? "there is no isuee" :
            <Popover content={content} title="Title">
                <Button type="primary" size={"small"} danger>Show Fix Info</Button>
            </Popover>
        // render: (serverIndex: string) => isAdmin == true ? <ServerDrawer serverIndex={serverIndex} text={"Edit Detail"}></ServerDrawer> : <FixDrawer serverIndex={serverIndex} username={username} text={"Issue"} ></FixDrawer>
    },
];



function App() {
    const [data, setData] = useState([])

    useEffect(() => {
        // getUserRole()
        getFixInfoList()
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

    // async function getUserRole() {
    //     axios.get('http://127.0.0.1:8080/user/info', {
    //         params: { "token": cookie.load("token") }
    //     }).then(res => {
    //         console.log("获取data:", res.data.data)
    //         console.log("获取username和isAdmin:", res.data.data.username, res.data.data.isAdmin)
    //         // setUser(res.data.data)
    //         username = res.data.data.username
    //         isAdmin = res.data.data.isAdmin
    //     }).catch(err => {
    //         console.log('error:', err.message);
    //     });
    // }


    const getFixInfoList = () => {
        axios.get('http://127.0.0.1:8080/fix/all')
            .then(response => {
                console.log(response.data)
                setData(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }


    // const getFailedServerList = () => {
    //     axios.get('http://127.0.0.1:8080/server/failed')
    //         .then(response => {
    //             console.log(response.data)
    //             setData(response.data.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }



    // const getIssuedServerList = () => {
    //     axios.get('http://127.0.0.1:8080/server/issued')
    //         .then(response => {
    //             console.log(response.data)
    //             setData(response.data.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }







    return (
        <Col span={20} offset={2}>
            <Space align="center" direction='vertical'>
                <h1 style={{ textAlign: "center" }}>Fix Info Table</h1>
                <Table rowKey="id" columns={columns} dataSource={data} scroll={{ y: 450 }} />
            </Space>

            <Space>
                <Button size="small" onClick={getFixInfoList} type='primary'>Show All</Button>
                {/* <Button size="small" onClick={getFailedServerList} type='primary'>Show Failed</Button>
                <Button size="small" onClick={getIssuedServerList} type='primary'>Show Issued</Button> */}
            </Space>
        </Col >
    )
}

export default App;