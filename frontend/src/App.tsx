import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import './App.css';
import { store } from 'core/store';
import { queryClient } from 'core/queryClient';
import { QuestionsList } from 'apps/themes/pages/QuestionsList';
import { LoginPage } from 'apps/users/pages/LoginPage';
import { CheckAuth } from 'apps/users/components/CheckAuth';
import { LoggedUserLayout } from 'apps/users/components/LoggedUserLayout';
import { themesRoutes } from 'apps/themes/Routes';
import { ContentLayout } from 'core/components/ContentLayout';

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router>
                    <Routes>
                        <Route path="/" element={<CheckAuth onSuccessRedirectPath="/themes" onFailRedirectPath="/login"/>}>
                            <Route path="/login" element={
                                <ContentLayout content={<LoginPage />} />
                            } />
                            <Route path="/" element={<LoggedUserLayout />}>
                                <Route path="/" element={<Navigate to="/themes" />}/>
                                <Route path="/questions/list" element={
                                    <ContentLayout content={<QuestionsList />} />
                                } />
                                {themesRoutes()}
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
