import React from 'react';
import { Button, notification, Space } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';


const [api] = notification.useNotification();

const notify = (type: NotificationType, message: string, description: string) => {
    api[type]({
        message: message,
        description: description
    });
};



export { notify };
