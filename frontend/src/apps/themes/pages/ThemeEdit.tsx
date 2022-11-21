import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useMutation } from 'react-query';
import { Drawer } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { dataUtils } from 'core/utils';
import { useFetchPathData } from 'core/hooks/useFetchPathData';
import { ErrorResult } from 'core/components/ErrorResult';
import { Spinner } from 'core/components/Spinner';
import { queryClient } from 'core/queryClient';
import { editTheme, getTheme } from '../api';
import { ITheme, TThemeFieldErrors } from '../models';
import { ThemeForm } from '../components/ThemeForm';
import { routeMap, ThemesPaths } from '../routeMap';
import { ThemeServerValidationErrors } from '../components/ThemeServerValidationErrors';

export const ThemeEdit: React.FC = () => {
    const params = useParams<'id'>();
    const navigate = useNavigate();

    const {status, data} = useFetchPathData<ITheme>({
        path: ['themes', ThemesPaths.details],
        params,
        displayFieldName: 'label',
        query: () => getTheme(params.id!),
    });

    const mutation = useMutation<ITheme, TThemeFieldErrors, ITheme>(
        ThemesPaths.create,
        (theme: ITheme) => editTheme({...theme, id: data?.id}, data?.id || ''), 
        {
            onSuccess: () => {
                queryClient.removeQueries([ThemesPaths.details, params]);
                navigate(generatePath(routeMap.details.path, {id: params.id}));
            },
        }
    );

    const [drawlerOpened, setDrawlerOpened] = useState(false);
    useEffect(() => {
        mutation.error && setDrawlerOpened(true);
    }, [mutation.error]);

    if (dataUtils.isLoading(status)) {
        return <Spinner />;
    } else if (dataUtils.isReady(status) && data) {
        return (
            <>
                <ThemeForm
                    onSubmit={mutation.mutate}
                    isLoading={mutation.isLoading}
                    prefill={data}
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
        );
    } else {
        return <ErrorResult />
    }
}
