import React, { useState, useEffect } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { createTheme } from '../api';
import { ITheme, TThemeFieldErrors } from '../models';
import { ThemeForm } from '../components/ThemeForm';
import { routeMap } from '../routeMap';
import { ThemeServerValidationErrors } from '../components/ThemeServerValidationErrors';

/** Страница с созданием тематики с вопросами */
export const ThemeCreate: React.FC = () => {
    const navigate = useNavigate();

    const mutation = useMutation<ITheme, TThemeFieldErrors, ITheme>('createTheme', createTheme, {
        onSuccess: () => navigate(routeMap.list.path),
    });

    const [drawlerOpened, setDrawlerOpened] = useState(false);
    useEffect(() => {
        mutation.error && setDrawlerOpened(true);
    }, [mutation.error]);


    return (
        <>
            <ThemeForm
                onSubmit={mutation.mutate}
                isLoading={mutation.isLoading}
                onCancel={() => navigate(generatePath(routeMap.list.path))}
            />
            <Drawer
                open={drawlerOpened}
                onClose={() => setDrawlerOpened(false)}
                data-testid="drawler"
                closeIcon={<CloseOutlined data-testid="closeErrorsDrawler"/>}
            >
                <ThemeServerValidationErrors serverErrors={mutation.error}/>
            </Drawer>
        </>
    )
}
