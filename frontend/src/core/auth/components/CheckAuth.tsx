import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'core/auth/api';
import { Layout, Spin } from 'antd';
import { IUser } from 'apps/users/models';
import { clearAuthorized, setAuthorized } from 'core/auth/slices';
import { TAppState } from 'core/store';

const containerStyle = {
    "display": "flex",
    "alignItems": "center",
    "justifyContent": "center",
    "height": "100vh",
}

interface IProps {
    onSuccessRedirectPath: string;
    onFailRedirectPath: string;
}

const doNotRedirectHereOnSuccessAuth = ['/', '/login'];

export const CheckAuth: React.FC<IProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(selectAuthFlag);
    const isAuthorizedRef = useRef(isAuthorized);

    const {isLoading} = useQuery('currentUser', getCurrentUser, {      
        onSuccess: (user: IUser) => {
            dispatch(setAuthorized(user));

            const path = doNotRedirectHereOnSuccessAuth.some((path: string) => path === location.pathname)
                ? props.onSuccessRedirectPath
                : location.pathname;
            navigate(path);
        },
        onError: () => {
            dispatch(clearAuthorized());
            navigate(
                doNotRedirectHereOnSuccessAuth.some((path: string) => path === location.pathname)
                    ? props.onFailRedirectPath
                    : `${props.onFailRedirectPath}?redirectTo=${location.pathname}`
            );
        }
    });

    useEffect(() => {
        if (!isAuthorized && isAuthorizedRef.current) {
            const navigateTo = location.pathname === '/login'
                ? '/login'
                : `/login?redirectTo=${location.pathname}`;
            navigate(navigateTo);
        }
        isAuthorizedRef.current = isAuthorized;
    }, [isAuthorized, navigate]);

    if (isLoading) {
        return (
            <Layout>
                <div style={containerStyle} >
                    <Spin spinning={true}/>
                </div>
            </Layout>
        )
    }

    return <Outlet />;
};

export const selectAuthFlag = (state: TAppState) => state.auth.authorized;
