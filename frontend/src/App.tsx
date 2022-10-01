import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import { QuestionsList } from 'apps/questions/Pages/QuestionsList';
import { ThemesList }  from 'apps/questions/Pages/ThemesList';
import { ThemeDetails }  from 'apps/questions/Pages/ThemeDetails';
import { ThemeCreate }  from 'apps/questions/Pages/ThemeCreate';
import { LoginPage } from 'apps/users/Pages/LoginPage';
import { CheckAuth } from 'apps/users/components/CheckAuth';
import { AuthLayout } from 'core/components/AuthLayout';
import { store } from 'core/store';

const { Content } = Layout;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

const contentStyle = {
    margin: '24px 16px',
    padding: 24,
    minHeight: 280,
}

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<CheckAuth onSuccessRedirectPath="questions/list" onFailRedirectPath="/login"/>}>
                            <Route path="/login" element={
                                <Content
                                    className="site-layout-background"
                                    style={contentStyle}
                                >
                                    <LoginPage />
                                </Content>
                            }/>
                            <Route path="/" element={<AuthLayout />}>
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
                            </Route>
                        </Route>
                    </Routes>
                </Router>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default App;
