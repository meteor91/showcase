import React from 'react';
import { Space, Typography } from 'antd';
import { useTranslation } from "react-i18next";
import { TQuestionSet, TThemeFieldErrors } from '../models';

const { Text } = Typography;


export const ThemeServerValidationErrors: React.FC<{serverErrors?: TThemeFieldErrors | null}> = (props) => {
    const {serverErrors} = props;
    const {t} = useTranslation();

    if (!serverErrors) {
        return <div>{t('common.serverError.tryLater')}</div>
    }

    const errorsList = []

    let key = 0;

    if (serverErrors.label) {
        errorsList.push(<Text type="danger" key={`serverError-${key++}`}>{t('themes.validationErrors.themeName')} {serverErrors.label}</Text>)
    }

    if (Array.isArray(serverErrors.questionSet)) {
        if (typeof serverErrors.questionSet[0] === 'string') {
            (serverErrors.questionSet as string[]).forEach(error => {
                errorsList.push(
                    <Text type="danger" key={`serverError-${key++}`}>{t('themes.validationErrors.questions')} {error}</Text>
                );
            });
        } else {
            (serverErrors.questionSet as TQuestionSet[]).forEach((error, index) => {
                const num = index + 1;
                error.label && errorsList.push(
                    <Text type="danger" key={`serverError-${key++}`}>{t('themes.validationErrors.questionLabel', {num})} {error.label}</Text>
                );
                error.answer && errorsList.push(
                    <Text type="danger" key={`serverError-${key++}`}>{t('themes.validationErrors.questionAnswer', {num})} {error.answer}</Text>
                );
                error.price && errorsList.push(
                    <Text type="danger" key={`serverError-${key++}`}>{t('themes.validationErrors.questionPrice', {num})} {error.price}</Text>
                );
            });
        }
    }
    
    return <Space direction="vertical">{errorsList}</Space>;
}
