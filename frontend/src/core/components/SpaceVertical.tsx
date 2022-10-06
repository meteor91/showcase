import React from 'react';
import { Space } from "antd"
import { SpaceSize } from 'antd/lib/space';

interface IProps {
    children: React.ReactNode;
    size?: SpaceSize
}

export const SpaceVertical: React.FC<IProps> = (props) => {
    const {size, children} = props;

    return (
        <Space size={size ? size : 'large'} direction={'vertical'} style={{ display: 'flex' }}>
            {children}
        </Space>
    )
}