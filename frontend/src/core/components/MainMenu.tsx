import {BulbOutlined,} from '@ant-design/icons';
import {Menu } from 'antd';
import React from 'react';
import {Link, useLocation} from "react-router-dom";

export const MainMenu: React.FC = () => {
    const location = useLocation();

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            style={{height:"100vh"}}
        >
        <Menu.Item key="/questions/list">
          <Link to="/questions/list">
            <BulbOutlined />
            <span>Вопросы</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/themes/list">
          <Link to="/themes/list">
            <BulbOutlined />
            <span>Тематика</span>
          </Link>
        </Menu.Item>
      </Menu>        
    )
}
