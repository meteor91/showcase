import React from 'react';
import { Space, Typography } from 'antd';
import { TQuestionSet, TThemeFieldErrors } from '../models';

const { Text } = Typography;


export const ThemeServerValidationErrors: React.FC<{serverErrors?: TThemeFieldErrors | null}> = (props) => {
    const {serverErrors} = props;
    if (!serverErrors) {
        return <div>Что то пошло не так, повторите попытку позже</div>
    }

    const errorsList = []

    if (serverErrors.label) {
        errorsList.push(<Text type="danger">Название тематики: {serverErrors.label}</Text>)
    }

    if (Array.isArray(serverErrors.questionSet)) {
        if (typeof serverErrors.questionSet[0] === 'string') {
            (serverErrors.questionSet as string[]).forEach(error => {
                errorsList.push(
                    <Text type="danger">Вопросы: {error}</Text>
                );
            });
        } else {
            (serverErrors.questionSet as TQuestionSet[]).forEach((error, index) => {
                const num = index + 1;
                error.label && errorsList.push(
                    <Text type="danger">Вопрос № {num}: {error.label}</Text>
                );
                error.answer && errorsList.push(
                    <Text type="danger">Ответ на вопрос № {num}: {error.answer}</Text>
                );
                error.price && errorsList.push(
                    <Text type="danger">Цена ответа на вопрос № {num}: {error.price}</Text>
                );
            });
        }
    }
    
    return <Space direction="vertical">{errorsList}</Space>;
}
