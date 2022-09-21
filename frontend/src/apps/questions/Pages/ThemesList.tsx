import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {Link} from "react-router-dom";
import { useQuery } from 'react-query';
import {dataUtils} from 'core/utils';
import {getThemesList} from '../api';
import {ITheme} from '../models';

const columns: ColumnsType<ITheme> = [
    {
        title: 'Название',
        dataIndex : 'label',
        key: 'label',
        render: (_, record) => <Link to={`/theme:${record.id}`}>{record.label}</Link>
    }
];

export const ThemesList: React.FC = () => {
    const {status, data} = useQuery('themes', getThemesList);

    return (
        <div>
            <Table rowKey="id" loading={dataUtils.isLoading(status)} columns={columns} dataSource={data?.data.results} />
        </div>
    )

}