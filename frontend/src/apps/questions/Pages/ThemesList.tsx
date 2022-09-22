import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { dataUtils } from 'core/utils';
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
    const [nextPage, setNextPage] = useState<string | undefined>();
    const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    const {status, data} = useQuery(['themes', currentPageNumber], () => getThemesList(nextPage));
    const navigate = useNavigate();
    
    //TODO: переделать пагинацию
    const pagination = {
        onChange: (page: number) => {
            page !==currentPageNumber && setNextPage(page>currentPageNumber ? data?.data.next : data?.data.previous);
            setCurrentPageNumber(page);
            
        },
        total:  data?.data.count,
        pageSize: 5
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