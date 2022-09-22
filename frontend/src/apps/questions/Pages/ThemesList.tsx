import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { dataUtils } from 'core/utils';
import { defaultPageSize } from 'core/consts';
import { getThemesList } from '../api';
import { ITheme } from '../models';

const columns: ColumnsType<ITheme> = [
    {
        title: 'Название',
        dataIndex : 'label',
        key: 'label',
        render: (_, record) => <Link to={`/themes/${record.id}`}>{record.label}</Link>
    }
];

export const ThemesList: React.FC = () => {
    const [page, setPage] = useState(0);
    const {status, data} = useQuery(['themes', page], () => getThemesList(page));
    const navigate = useNavigate();

    const pagination = {
        onChange: (newPage: number,  _newSize: number) => {
            newPage && setPage(newPage);
        },
        total:  data?.data.total,
        pageSize: defaultPageSize,
    }

    return (
        <div>
            <Button onClick={() => navigate('/themes/create')}>Создать</Button>
            <Table
                rowKey="id"
                loading={dataUtils.isLoading(status)}
                columns={columns}
                dataSource={data?.data.results}
                pagination={pagination}
            />
        </div>
    );
}
