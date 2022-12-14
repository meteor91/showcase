import React, { useState, useEffect } from 'react';
import { Button, Table, Col, Row } from 'antd';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { dataUtils, renderDate } from 'core/utils';
import { defaultPageSize } from 'core/consts';
import { SpaceVertical } from 'core/components/SpaceVertical';
import { paginationStorage } from 'core/paginationStorage';
import { TAppState } from 'core/store';
import { IUser } from '../models';
import { routeMap } from '../routeMap';
import { getUsersList } from '../api';

/**
 * Users list page.
 */
export const UsersList: React.FC = () => {
    const [page, setPage] = useState(paginationStorage.getItem('usersList'));
    const navigate = useNavigate();
    const {t} = useTranslation();
    const locale = useSelector((state: TAppState) => state.settings.locale);

    const {status, data, refetch, isRefetching} = useQuery('usersList', () => getUsersList(page), {keepPreviousData: true});

    useEffect(() => {
        refetch();
        paginationStorage.setItem('usersList', page);
    }, [page, refetch]);

    const pagination = {
        onChange: (newPage: number, _newSize: number) => {
            newPage && setPage(newPage);
        },
        total:  data?.total,
        pageSize: defaultPageSize,
        defaultCurrent: page,
        hideOnSinglePage: true,
    };

    return (
        <SpaceVertical>
            {/* TODO */}
            <Row>
                <Col span={24}>
                    <Button
                        onClick={() => navigate(generatePath(routeMap.create.path))}
                        data-testid="createUsersButton"
                        disabled
                    >
                        {t('common.action.create')}
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Table
                        key={locale}
                        rowKey="id"
                        loading={dataUtils.isLoading(status) || isRefetching}
                        dataSource={data?.results}
                        pagination={pagination}
                    >
                        <Table.Column
                            key="label"
                            title={t<string>('users.fieldNames.username')}
                            dataIndex="label"
                            render={renderUsernameLink}
                        />
                        <Table.Column
                            key="role"
                            title={t<string>('users.fieldNames.role')}
                            dataIndex="role"
                            render={(value: string) => t(`users.role.${value}`)}
                        />
                        <Table.Column
                            key="dateJoined"
                            title={t<string>('users.fieldNames.joinDate')}
                            dataIndex="dateJoined"
                            render={renderDate}
                        />
                    </Table>
                </Col>
            </Row>
        </SpaceVertical>
    );
}

const renderUsernameLink = (_value: string, record: IUser) => <Link to={generatePath(routeMap.details.path, {id: record.id})}>{record.username}</Link>
