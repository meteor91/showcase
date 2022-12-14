import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import 'moment/locale/ru';
import './App.scss';
import { store } from 'core/store';
import { queryClient } from 'core/queryClient';
import { LoginPage } from 'core/auth/pages/LoginPage';
import { CheckAuth } from 'core/auth/components/CheckAuth';
import { LoggedUserLayout } from 'core/auth/components/LoggedUserLayout';
import { themesRoutes } from 'apps/themes/routes';
import { usersRoutes } from 'apps/users/routes';
import { ConfigProvider } from 'core/components/ConfigProvider';

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
                                    {themesRoutes()}
                                    {usersRoutes()}
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
