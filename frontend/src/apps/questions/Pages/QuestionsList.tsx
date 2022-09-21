import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';
import {dataUtils} from 'core/utils';
import {getQuestionsList} from '../api';
import {IQuestion} from '../models';

const columns: ColumnsType<IQuestion> = [
    {
        title: 'Вопрос',
        dataIndex : 'label',
        key: 'label'
    },
    {
        title: 'Цена',
        dataIndex : 'price',
        key: 'price'
    },
    {
        title: 'Группа',
        dataIndex : 'questionGroupLabel',
        key: 'questionGroupLabel'
    },
]

export const QuestionsList: React.FC = () => {
    const {status, data} = useQuery('questions', getQuestionsList);

    return (
        <div>
            <Table rowKey="id" loading={dataUtils.isLoading(status)} columns={columns} dataSource={data?.data.results} />
        </div>
    )

}