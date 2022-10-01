import React, { useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useQuery } from 'react-query';
import {dataUtils} from 'core/utils';
import { defaultPageSize } from 'core/consts';
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
        dataIndex : 'themeLabel',
        key: 'themeLabel'
    },
]

export const QuestionsList: React.FC = () => {
    const [page, setPage] = useState(0);
    const {status, data} = useQuery(['questions', page], () => getQuestionsList(page));

    const pagination = {
        onChange: (newPage: number,  _newSize: number) => {
            newPage && setPage(newPage);
        },
        total:  data?.data.total,
        pageSize: defaultPageSize,
    }


    return (
        <div>
            <Table
                rowKey="id"
                loading={dataUtils.isLoading(status)}
                columns={columns}
                dataSource={data?.data.results}
                pagination={pagination}
            />
        </div>
    )
}
