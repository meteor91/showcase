import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {dataUtils} from 'core/utils';
import { getTheme } from '../api';
import { IQuestion } from '../models';

const columns: ColumnsType<IQuestion> = [
    {
        title: 'Вопрос',
        dataIndex : 'label',
        key: 'label',
    },
    {
        title: 'Ответ',
        dataIndex : 'answer',
        key: 'answer',
    },    
    {
        title: 'Цена',
        dataIndex : 'price',
        key: 'price'
    },
];

export const ThemeDetails: React.FC = () => {
    const params = useParams();
    
    //TODO: разобраться со всеми дженериками useQuery/mutation
    const {status, data} = useQuery('themeDetails', () => getTheme(params.id));
    

    if(dataUtils.isLoading(status)) {
        return <div>loading...</div>;
    } else if (data) {
        return (
            <Table
                rowKey="id"
                loading={dataUtils.isLoading(status)}
                columns={columns}
                dataSource={data.questionSet}
                pagination={false}
            />
        )
    } else {
        return <div>error</div>
    }
}