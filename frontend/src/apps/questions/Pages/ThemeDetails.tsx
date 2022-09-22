import React from 'react';
import { useParams } from "react-router-dom";
import { useQuery } from 'react-query';
import {dataUtils} from 'core/utils';
import { getTheme } from '../api';
import { IQuestion, ITheme } from '../models';

export const ThemeDetails: React.FC = () => {
    const params = useParams();
    
    //TODO: разобраться со всеми дженериками useQuery/mutation
    const {status, data} = useQuery('themeDetails', () => getTheme(params.id));
    

    if ( dataUtils.isLoading(status)) {
        return <div>loading...</div>;
    } else if (data?.data) {
        const theme = data.data as ITheme;
        return (
            <div>
                <div>{theme.label}</div>
                {theme.questionSet?.map((question: IQuestion) => (
                    <div key={question.id}>{question.label} - {question.answer} - {question.price}</div>
                ))}
            </div>
        )
    } else {
        return <div>error</div>
    }
}