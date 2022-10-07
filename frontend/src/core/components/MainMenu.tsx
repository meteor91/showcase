import React from 'react';
import { BulbOutlined, QuestionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routeMap } from '../routeMap';

const menuItems = [{
    key: '/questions/list',
    label: (
        <Link to="/questions/list">
            <QuestionOutlined />
            <span>Вопросы</span>
        </Link>
    ),
}, {
    key: routeMap.themes.list.path,
    label: (
        <Link to={routeMap.themes.list.path}>
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
