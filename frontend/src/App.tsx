import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { MainMenu } from 'core/components/MainMenu';
import './App.css';
import { QuestionsList } from 'apps/questions/Pages/QuestionsList';
import { ThemesList }  from 'apps/questions/Pages/ThemesList';

const { Header, Sider, Content } = Layout;

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
});

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);


    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="logo" />
                    <MainMenu />
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0 }}>
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                        className: 'trigger',
                        onClick: () => setCollapsed(!collapsed),
                    })}
                    </Header>
                    <Routes>
                        <Route path="/" element={<Navigate to="/questions" />}/>
                        <Route path="/questions" element={
                            <Content
                                className="site-layout-background"
                                style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                }}
                            >
                                <QuestionsList />
                            </Content>
                            }/>
                        <Route path="/themes" element={
                            <Content
                                className="site-layout-background"
                                style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                                }}
                            >
                                <ThemesList />
                            </Content>
                            }/>
                        </Routes>
                    </Layout>
                </Layout>
            </Router>
        </QueryClientProvider>
    );
};

export default App;