import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useQuery } from 'react-query';
import { isEmpty } from 'lodash';
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

//TODO: сделать возможность отображения кастомного кол-ва элементов
const defaultPageSize = 5;

export const ThemesListLab: React.FC = () => {
    // const [nextPage, setNextPage] = useState<string | undefined>();
    // const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
    // const [page, setPage] = useState(0);
    const params = useParams();
    const offset = params.offset || 0;       
    const limit = params.limit || defaultPageSize;
    let [searchParams, setSearchParams] = useSearchParams();

    console.log('offset', offset)
    console.log('limit', limit)
    //@ts-ignore
    const {status, data} = useQuery(['themes', offset, limit], () => getThemesList(limit, offset));
    const navigate = useNavigate();

    const pagination = {
        onChange: (newPage: number,  newSize: number) => {
            // newPage && setPage(newPage);
            const pageNavigation = [];
            pageNavigation.push(`offset=${(newPage-1) * newSize}`);       
            pageNavigation.push(`limit=${newSize}`);
            const pageNavigationString = !isEmpty(pageNavigation) ? `?${pageNavigation.join('&')}` : ''
            navigate(`/themes/list${pageNavigationString}`);
        },
        total:  data?.data.total,
         //@ts-ignore
        pageSize: limit as number,
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
//"http://localhost:8000/api/questions/themes/?limit=5&offset=10",
// http://localhost:8000/api/questions/themes/?limit=5&offset=15