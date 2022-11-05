import React from 'react';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useMutation } from 'react-query';
import { dataUtils } from 'core/utils';
import { useFetchPathData } from 'core/hooks/useFetchPathData';
import { ErrorResult } from 'core/components/ErrorResult';
import { Spinner } from 'core/components/Spinner';
import { queryClient } from 'core/queryClient';
import { editTheme, getTheme } from '../api';
import { ITheme, TThemeFieldErrors } from '../models';
import { ThemeForm } from '../components/ThemeForm';
import { routeMap, ThemesPaths } from '../routeMap';

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
                queryClient.removeQueries([ThemesPaths.details, params.id]);
                navigate(generatePath(routeMap.details.path, {id: params.id}));
            },
        }
    );

    if (dataUtils.isLoading(status)) {
        return <Spinner />;
    } else if (dataUtils.isReady(status) && data) {
        return (
            <ThemeForm 
                onSubmit={mutation.mutate}
                isLoading={mutation.isLoading}
                serverValidationErrors={mutation.error}
                prefill={data}
                onCancel={() => navigate(generatePath(routeMap.list.path))}
            />
        );
    } else {
        return <ErrorResult />
    }
}
