import React, { useState } from 'react';
import { Button, Table, Col, Row } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import { useQuery } from 'react-query';
import * as moment from 'moment';
import { dataUtils } from 'core/utils';
import { defaultPageSize } from 'core/consts';
import { getThemesList } from '../api';
import { ITheme } from '../models';
import { routeMap } from '../routeMap';
import { SpaceVertical } from 'core/components/SpaceVertical';

const columns: ColumnsType<ITheme> = [
    {
        title: 'Название',
        dataIndex : 'label',
        key: 'label',
        render:  (_, record) => <Link to={generatePath(routeMap.details.path, {id: record.id})}>{record.label}</Link>
    },
    {
        title: 'Автор',
        dataIndex : 'createdBy',
        key: 'createdBy',
    },
    {
        title: 'Создано',
        dataIndex : 'createdAt',
        key: 'createdAt',
        render: (_, record) => moment.utc(record.createdAt).format('ll')
    },
    {
        title: 'Обновлено',
        dataIndex : 'updatedAt',
        key: 'updatedAt',
        render: (_, record) => moment.utc(record.updatedAt).format('ll')
    }
];

export const ThemesList: React.FC = () => {
    //TODO: страница не сохраняется после возвращения обратно из деталки, проработать
    const [page, setPage] = useState(0);
    const {status, data} = useQuery(['themes', page], () => getThemesList(page));
    const navigate = useNavigate();

    const pagination = {
        onChange: (newPage: number,  _newSize: number) => {
            newPage && setPage(newPage);
        },
        total:  data?.data.total,
        pageSize: defaultPageSize,
    };

    return (
        <SpaceVertical>
            <Row>
                <Col span={24}>
                    <Button onClick={() => navigate(generatePath(routeMap.create.path))}>Создать</Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        rowKey="id"
                        loading={dataUtils.isLoading(status)}
                        columns={columns}
                        dataSource={data?.data.results}
                        pagination={pagination}
                    />
                </Col>
            </Row>
        </SpaceVertical>
    );
}
