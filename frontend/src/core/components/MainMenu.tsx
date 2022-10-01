import React from 'react';
import { BulbOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [{
    key: '/questions/list',
    label: (
        <Link to="/questions/list">
            <BulbOutlined />
            <span>Вопросы</span>
        </Link>
    ),
}, {
    key: '/themes/list',
    label: (
        <Link to="/themes/list">
            <BulbOutlined />
            <span>Тематика</span>
        </Link>            
    ),
}];

export const MainMenu: React.FC = () => {
    const location = useLocation();

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            style={{height:"100vh"}}
            items={menuItems}
        />  
    )
};
