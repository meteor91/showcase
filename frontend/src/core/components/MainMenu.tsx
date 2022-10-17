import i18n from 'core/i18n'
import React from 'react';
import { BulbOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { routeMap } from '../routeMap';

const menuRoutes = [
    {
        ...routeMap.themes.list,
        icon: <BulbOutlined />
    }
]

const menuItems = () => menuRoutes.map((menuRoute) => {
    return {
        key: menuRoute.path,
        label: (
            <Link to={menuRoute.path}>
                {menuRoute.icon}
                <span>{i18n.t<string>(menuRoute.name)}</span>
            </Link>
        ),
    }
});

export const MainMenu: React.FC = () => {
    const location = useLocation();
    const defaultSelectedKey = menuRoutes.find((menuRoute => location.pathname.indexOf(menuRoute.path) === 0))?.path;
    const defaultSelectedKeys = defaultSelectedKey ? [defaultSelectedKey]: undefined;

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            style={{height: "100vh"}}
            items={menuItems()}
        />  
    )
};
