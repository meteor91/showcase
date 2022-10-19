import { Spin } from 'antd';
import React from 'react';

const containerStyle = {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "height": "100%",
}

export const Spinner: React.FC = () => {
    return (
        <div style={containerStyle} >
            <Spin spinning={true}/>
        </div>
    )
}
