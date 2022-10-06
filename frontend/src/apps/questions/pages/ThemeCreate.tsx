import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { createTheme } from '../api';
import { ITheme, TThemeFieldErrors } from '../models';
import { ThemeForm } from '../components/ThemeForm';

/**
 * Страница с созданием тематики с вопросами.
 * Необходимо переделать логику отображения серверных ошибок.
 * Необходимо добавить блокировку полей ввода при выполнении запроса сохранения формы.
 */
export const ThemeCreate: React.FC = () => {
    const navigate = useNavigate();

    const mutation = useMutation<ITheme, TThemeFieldErrors, ITheme>('createTheme', createTheme, {
        onSuccess: () => navigate('/themes/list'),
    });

    return (
        <ThemeForm 
            onSubmit={mutation.mutate}
            serverError={mutation.error}
            isLoading={mutation.isLoading}
        />
    )
}
