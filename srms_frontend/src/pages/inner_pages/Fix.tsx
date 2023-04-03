import React, { useState, useEffect } from 'react';
import axios from 'axios';
export default function Fix() {


    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/user/')
            .then(response => {
                setData(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    return (
        <div>
            fix
            {/* {data} */}
        </div>
    )
}
