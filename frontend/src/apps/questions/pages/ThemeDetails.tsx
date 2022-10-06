import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Button, Table, Col, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import {dataUtils} from 'core/utils';
import { getTheme } from '../api';
import { IQuestion } from '../models';
import { Spinner } from 'core/components/Spinner';
import { SpaceVertical } from 'core/components/SpaceVertical';

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

    const {status, data} = useQuery(['themeDetails', params.id],  () => getTheme(params.id));
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/themes/edit/${params.id}`)
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
        return <div>error</div>
    }
}