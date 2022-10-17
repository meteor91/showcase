import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'core/auth/api';
import { Layout, Spin } from 'antd';
import { IUser } from 'apps/users/models';
import { setCurrentUser, clearCurrentUser } from 'apps/users/slices';
import { setAuthorized } from 'core/auth/slices';
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

export const CheckAuth: React.FC<IProps> = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthorized = useSelector(selectAuthFlag);
    const isAuthorizedRef = useRef(isAuthorized);

    const {isLoading} = useQuery('currentUser', getCurrentUser, {      
        onSuccess: (user: IUser) => {
            dispatch(setCurrentUser(user));
            dispatch(setAuthorized(true));
            const path = location.pathname !== '/login' ? location.pathname : props.onSuccessRedirectPath;
            navigate(path);
        },
        onError: () => {
            dispatch(clearCurrentUser());
            dispatch(setAuthorized(false));
            navigate(props.onFailRedirectPath);
        }
    });

    useEffect(() => {
        if (!isAuthorized && isAuthorizedRef.current) {
            navigate('/login');
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
