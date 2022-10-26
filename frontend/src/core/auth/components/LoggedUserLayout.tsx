import i18n from 'i18next';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { Outlet } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, notification } from 'antd';
import { MainMenu } from 'core/components/MainMenu';
import { TAppState } from 'core/store';
import { setLocale } from 'core/slices/settings';
import { logoutUser } from 'core/auth/api';
import { clearAuthorized } from '../slices';

const { Header, Sider } = Layout;

export const LoggedUserLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentLang, setCurrentLang] = useState('EN');
    const dispatch = useDispatch();
    const user = useSelector((state: TAppState) => state.auth.currentUser);
    const mutation = useMutation(logoutUser);

    const handleLogout = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                dispatch(clearAuthorized())
            }
        });
    };

    const handleChangeLang = (menuItem: {key: string}) => {
        setCurrentLang(menuItem.key);
        i18n.changeLanguage(menuItem.key, (err, t) => {
            if (err) {
                notification.open({message: "Can't change language, try later"});
            } else {
                dispatch(setLocale(menuItem.key));
            }
        });
    }

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" />
                <MainMenu />
            </Sider>

            <Layout className="site-layout">
                <Header className="site-layout-background" style={{ padding: 0 }}>
                    <div className="header-actions">
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: "trigger icon-xl",
                            onClick: () => setCollapsed(!collapsed),
                        })}
                        <div>
                            <Button type="text">{user?.username}</Button>

                            <Dropdown
                                placement="bottom" 
                                overlay={
                                    <Menu
                                        items={items}
                                        selectable
                                        defaultSelectedKeys={[currentLang]}
                                        onClick={handleChangeLang}
                                    />
                                }>
                                <Button>{currentLang}</Button>
                            </Dropdown>
                            <LogoutOutlined className="trigger icon-xl" onClick={handleLogout}/>
                        </div>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
};

const items=[
    {
        key: 'RU',
        label: 'RU',
    },
    {
        key: 'EN',
        label: 'EN',
    }
];