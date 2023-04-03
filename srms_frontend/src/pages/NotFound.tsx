// import React from 'react'

import { Button } from "antd";

export default function NotFound() {
    return (
        <div>
            <h1>NotFound 404</h1>
            <Button
                type="primary"
                href="/show"
            >
                Go to Main page</Button>
        </div>
    )
}
