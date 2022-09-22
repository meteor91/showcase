import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { MainMenu } from 'core/components/MainMenu';
import './App.css';
import { QuestionsList } from 'apps/questions/Pages/QuestionsList';
import { ThemesList }  from 'apps/questions/Pages/ThemesList';
import { ThemeDetails }  from 'apps/questions/Pages/ThemeDetails';
import { ThemeCreate }  from 'apps/questions/Pages/ThemeCreate';

const { Header, Sider, Content } = Layout;

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
});

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
}

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
                            <Route path="/" element={<Navigate to="/questions/list" />}/>
                            <Route path="/questions/list" element={
                                <Content
                                    className="site-layout-background"
                                    style={contentStyle}
                                >
                                    <QuestionsList />
                                </Content>
                            }/>
                            <Route path="/themes/list" element={
                                <Content
                                    className="site-layout-background"
                                    style={contentStyle}
                                >
                                    <ThemesList />
                                </Content>
                            }/>
                            <Route path="/themes/create" element={
                                <Content
                                    className="site-layout-background"
                                    style={contentStyle}
                                >
                                    <ThemeCreate/>
                                </Content>
                            }/>
                            <Route path={`/themes/:id`} element={
                                <Content
                                    className="site-layout-background"
                                    style={contentStyle}
                                >
                                    <ThemeDetails/>
                                </Content>
                            }/>
                        </Routes>
                    </Layout>
                </Layout>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

export default App;