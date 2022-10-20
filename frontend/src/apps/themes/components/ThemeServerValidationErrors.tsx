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

    let key = -1;

    if (serverErrors.label) {
        ++key;
        errorsList.push(
            <Text
                type="danger"
                key={`serverError-${key}`}
                data-testid={`serverError-${key}`}
            >
                {t('themes.validationErrors.themeName')} {serverErrors.label}
            </Text>
        )
    }

    if (Array.isArray(serverErrors.questionSet)) {
        if (typeof serverErrors.questionSet[0] === 'string') {
            (serverErrors.questionSet as string[]).forEach(error => {
                ++key;
                errorsList.push(
                    <Text
                        type="danger"
                        key={`serverError-${key}`}
                        data-testid={`serverError-${key}`}
                    >
                        {t('themes.validationErrors.questions')} {error}
                    </Text>
                );
            });
        } else {
            (serverErrors.questionSet as TQuestionSet[]).forEach((error, index) => {
                const num = index + 1;
                if (error.label) {
                    ++key;
                    errorsList.push(
                        <Text
                            type="danger"
                            key={`serverError-${key}`}
                            data-testid={`serverError-${key}`}
                        >
                            {t('themes.validationErrors.questionLabel', {num})} {error.label}
                        </Text>
                    );
                }
                if (error.answer) {
                    ++key;
                    errorsList.push(
                        <Text
                            type="danger"
                            key={`serverError-${key}`}
                            data-testid={`serverError-${key}`}
                        >
                            {t('themes.validationErrors.questionAnswer', {num})} {error.answer}
                        </Text>
                    );
                }
                if (error.price) {
                    ++key;
                    errorsList.push(
                        <Text
                            type="danger"
                            key={`serverError-${key}`}
                            data-testid={`serverError-${key}`}
                        >
                            {t('themes.validationErrors.questionPrice', {num})} {error.price}
                        </Text>
                    );
                }
            });
        }
    }
    
    return <Space direction="vertical" data-testid="errorList">{errorsList}</Space>;
}
