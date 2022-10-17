import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'moment/locale/ru';
import './App.css';
import { store } from 'core/store';
import { queryClient } from 'core/queryClient';
import { ContentLayout } from 'core/components/ContentLayout';
import { QuestionsList } from 'apps/themes/pages/QuestionsList';
import { LoginPage } from 'apps/users/pages/LoginPage';
import { CheckAuth } from 'apps/users/components/CheckAuth';
import { LoggedUserLayout } from 'apps/users/components/LoggedUserLayout';
import { themesRoutes } from 'apps/themes/Routes';
import {ConfigProvider} from 'core/components/ConfigProvider';

const App: React.FC = () => {
    return (
        <ReduxProvider store={store}>
            <QueryClientProvider client={queryClient}>
                <ConfigProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<CheckAuth onSuccessRedirectPath="/themes" onFailRedirectPath="/login"/>}>
                                <Route path="/login" element={
                                    <LoginPage />
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
                </ConfigProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </ReduxProvider>
    );
};

export default App;
