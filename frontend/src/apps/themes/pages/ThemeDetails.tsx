import React from 'react';
import { useParams, useNavigate, generatePath } from 'react-router-dom';
import { Button, Table, Col, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {dataUtils} from 'core/utils';
import { IQuestion } from '../models';
import { Spinner } from 'core/components/Spinner';
import { SpaceVertical } from 'core/components/SpaceVertical';
import { routeMap } from '../routeMap';
import { useDetailsQuery } from '../queries';
import { ErrorResult } from 'core/components/ErrorResult';

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
    const {status, data} = useDetailsQuery(params.id!)
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(generatePath(routeMap.edit.path, {id: params.id}));
    }

    if(dataUtils.isLoading(status)) {
        return <Spinner />;
    } else if (data) {
        return (
            <SpaceVertical>
                <Row gutter={[16, 16]}>
                    <Col span={24}><Typography.Text strong>Название: </Typography.Text>{data.label}</Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Table
                            rowKey="id"
                            loading={dataUtils.isLoading(status)}
                            columns={columns}
                            dataSource={data.questionSet}
                            pagination={false}
                        />
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Button onClick={handleEdit}>Редактировать</Button>
                    </Col>
                </Row>
            </SpaceVertical>
        )
    } else {
        return <ErrorResult />
    }
}
