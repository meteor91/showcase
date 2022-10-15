import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useMutation } from 'react-query';
import { Outlet } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { MainMenu } from 'core/components/MainMenu';
import { clearCurrentUser } from 'apps/users/slices';
import { logoutUser } from 'apps/users/api';

const { Header, Sider } = Layout;

export const LoggedUserLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch();
    const mutation = useMutation(logoutUser);

    const handleLogout = () => {
        mutation.mutate(undefined, {
            onSuccess: () => {
                dispatch(clearCurrentUser());
            }
        });
    };

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
                        <LogoutOutlined className="trigger icon-xl" onClick={handleLogout}/>
                    </div>
                </Header>
                <Outlet />
            </Layout>
        </Layout>
    );
};
