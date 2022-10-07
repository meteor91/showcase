import React from 'react';
import { useNavigate, useParams, generatePath } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { editTheme, getTheme } from '../api';
import { dataUtils } from 'core/utils';
import { Spinner } from 'core/components/Spinner';
import { queryClient } from 'core/queryClient';
import { ITheme, TThemeFieldErrors } from '../models';
import { ThemeForm } from '../components/ThemeForm';
import { routeMap } from '../routeMap';


export const ThemeEdit: React.FC = () => {
    const params = useParams();
    const navigate = useNavigate();

    const {status, data} = useQuery(['themeEdit', params.id], () => getTheme(params.id));

    const mutation = useMutation<ITheme, TThemeFieldErrors, ITheme>(
        'createTheme', 
        (theme: ITheme) => editTheme({...theme, id: data?.id}, data?.id || ''), 
        {
            onSuccess: () => {
                queryClient.removeQueries(['themeDetails', params.id]);
                navigate(generatePath(routeMap.details.path, {id: params.id}));
            },
        }
    );

    if (dataUtils.isLoading(status)) {
        return <Spinner />;
    } else {
        return (
            <ThemeForm 
                onSubmit={mutation.mutate}
                isLoading={mutation.isLoading}
                serverValidationErrors={mutation.error}
                prefill={data}
            />
        );
    }
}
