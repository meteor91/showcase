import React, { useState, useEffect } from 'react';
import { Button, Table, Col, Row, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import * as moment from 'moment';
import { dataUtils } from 'core/utils';
import { defaultPageSize } from 'core/consts';
import { SpaceVertical } from 'core/components/SpaceVertical';
import { deleteTheme, getThemesList } from '../api';
import { ITheme } from '../models';
import { routeMap } from '../routeMap';
import { paginationStorage } from 'core/paginationStorage';

const { confirm } = Modal;

export const ThemesList: React.FC = () => {
    const [page, setPage] = useState(paginationStorage.getItem('themesList'));
    const navigate = useNavigate();

    const {status, data, refetch, isRefetching} = useQuery('themesList', () => getThemesList(page), {keepPreviousData: true});
    const {status: delStatus, mutate} = useMutation<ITheme, unknown, ITheme>(
        'deleteTheme', 
        (theme: ITheme) => deleteTheme(theme), 
        {
            onSuccess: () => {
                const isFirstPage = page - 1 <= 0;
                if (!isFirstPage && data!.data.results.length <= 1) {
                    setPage(page - 1);
                } else {
                    refetch();
                }
            },
        }
    );

    useEffect(() => {
        refetch();
        paginationStorage.setItem('themesList', page);
    }, [page, refetch]);

    const pagination = {
        onChange: (newPage: number, _newSize: number) => {
            newPage && setPage(newPage);
        },
        total:  data?.data.total,
        pageSize: defaultPageSize,
        defaultCurrent: page,
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
                        loading={dataUtils.isLoading(status, delStatus) || isRefetching}
                        dataSource={data?.data.results}
                        pagination={pagination}
                        
                    >
                        <Table.Column 
                            key="label" 
                            title="Название" 
                            dataIndex="label"
                            render={renderThemeLabel}
                        />
                        <Table.Column
                            key="createdBy"
                            title="Автор"
                            dataIndex="createdBy"
                        />
                        <Table.Column
                            key="createdAt"
                            title="Создано"
                            dataIndex="createdAt"
                            render={renderDate}
                        />
                        <Table.Column 
                            key="updatedAt" 
                            title="Обновлено"
                            dataIndex="updatedAt"
                            render={renderDate}
                        />
                        <Table.Column<ITheme> 
                            key="deleteAction"
                            width={50}
                            render= {(record) => (
                                <DeleteOutlined className="trigger" onClick={() => {
                                    showDeleteConfirm(() => mutate(record))
                                }}/>
                            )}
                        />
                    </Table>
                </Col>
            </Row>
        </SpaceVertical>
    );
}

const renderDate = (value: string) => moment.utc(value).format('ll');
const renderThemeLabel = (_value: string, record: ITheme) => <Link to={generatePath(routeMap.details.path, {id: record.id})}>{record.label}</Link>

const showDeleteConfirm = (onConfirm: Function) => {
    confirm({
        title: 'Вы уверены что хотите удалить эту тематику?',
        icon: <ExclamationCircleOutlined />,
        okText: 'Да',
        okType: 'danger',
        cancelText: 'Нет',
        onOk: () => onConfirm(),
    });
};