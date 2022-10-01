import React, { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'apps/users/api';
import { Layout, Spin } from 'antd';
import { ILoggedUser } from 'apps/users/models';
import { setCurrentUser, clearCurrentUser } from 'apps/users/slices';
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
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const currentUserRef = useRef(currentUser);

    const {isLoading} = useQuery('currentUser', getCurrentUser, {      
        onSuccess: (user: ILoggedUser) => {
            dispatch(setCurrentUser(user));
            navigate(props.onSuccessRedirectPath);
        },
        onError: () => {
            dispatch(clearCurrentUser());
            navigate(props.onFailRedirectPath);
        }
    });

    useEffect(() => {
        if (currentUserRef.current !== null && currentUser === null) {
            navigate('/login');
        }
        currentUserRef.current = currentUser;
    }, [currentUser, navigate]);

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

function selectCurrentUser(state: TAppState) {
    return state.users.currentUser;
}
