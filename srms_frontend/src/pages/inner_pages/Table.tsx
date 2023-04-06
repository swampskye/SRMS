import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Col, Row, Card } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios'
import ServerDrawer from '../../components/ServerDrawer'
// import { useNavigate } from 'react-router-dom';
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

// const navigator = useNavigate


const columns: ColumnsType<DataType> = [
    // const columns = [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
        width: 400,
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Index',
        dataIndex: 'index',
        key: 'username',
        // render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
        render: (text: string) => <p>{text == 'working' ? '✅' : '❌'}</p>,
    },
    {
        title: 'Room',
        dataIndex: 'room',
        key: 'room',
    },
    {
        title: 'Last Fix Date',
        dataIndex: 'last_fix_date',
        key: 'last_fix_date',
    },
    {
        title: 'Operations',
        dataIndex: 'id',
        key: 'operations',
        // render: () => <Button type="primary">Detail</Button>
        render: (id: string) => <ServerDrawer id={id} text={"Edit Detail"}></ServerDrawer>
        // dataIndex: 'address',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'loser') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    // {
    //     title: 'Action',
    //     key: 'action',
    //     render: (_, record) => (
    //         <Space size="middle">
    //             <a>Invite {record.name}</a>
    //             <a>Delete</a>
    //         </Space>
    //     ),
    // },
];



function App() {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/server/')
            .then(response => {
                setData(response.data);
                // console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <Col span={20} offset={2}>
            <h1 style={{ textAlign: "center" }}>Server Table</h1>
            <Table rowKey="id" columns={columns} dataSource={data} scroll={{ y: 450 }} />
            <ServerDrawer id={"add new server"} text={"Edit"}></ServerDrawer>
        </Col >
    )
}

export default App;