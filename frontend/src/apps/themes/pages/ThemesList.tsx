import React, { useState, useEffect } from 'react';
import { Button, Table, Col, Row, Modal } from 'antd';
import { DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link, useNavigate, generatePath } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { TFunction, useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { dataUtils } from 'core/utils';
import { defaultPageSize } from 'core/consts';
import { SpaceVertical } from 'core/components/SpaceVertical';
import { paginationStorage } from 'core/paginationStorage';
import { TAppState } from 'core/store';
import { deleteTheme, getThemesList } from '../api';
import { ITheme } from '../models';
import { routeMap } from '../routeMap';

const { confirm } = Modal;

export const ThemesList: React.FC = () => {
    const [page, setPage] = useState(paginationStorage.getItem('themesList'));
    const navigate = useNavigate();
    const {t} = useTranslation();
    const locale = useSelector((state: TAppState) => state.settings.locale);

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
        hideOnSinglePage: true,
    };

    return (
        <SpaceVertical>
            <Row>
                <Col span={24}>
                    <Button 
                        onClick={() => navigate(generatePath(routeMap.create.path))}
                        data-testid="createThemeButton"
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
                        loading={dataUtils.isLoading(status, delStatus) || isRefetching}
                        dataSource={data?.data.results}
                        pagination={pagination}
                        data-testid="themesTable"
                    >
                        <Table.Column 
                            key="label" 
                            title={t<string>('themes.fieldNames.label')}
                            dataIndex="label"
                            render={renderThemeLabel}
                        />
                        <Table.Column
                            key="createdBy"
                            title={t<string>('themes.fieldNames.author')}
                            dataIndex="createdBy"
                            render={renderAuthor}
                        />
                        <Table.Column
                            key="createdAt"
                            title={t<string>('themes.fieldNames.createdAt')}
                            dataIndex="createdAt"
                            render={renderDate}
                            responsive={['md']}
                        />
                        <Table.Column 
                            key="updatedAt" 
                            title={t<string>('themes.fieldNames.updatedAt')}
                            dataIndex="updatedAt"
                            render={renderDate}
                            responsive={['xl']}
                        />
                        <Table.Column<ITheme> 
                            key="deleteAction"
                            width={50}
                            render= {(record) => (
                                <DeleteOutlined className="trigger" onClick={() => {
                                    showDeleteConfirm(() => mutate(record), t)
                                }}/>
                            )}
                        />
                    </Table>
                </Col>
            </Row>
        </SpaceVertical>
    );
}

const renderDate = (value: string) => {
    return moment.utc(value).format('ll');
}

const renderThemeLabel = (_value: string, record: ITheme) => (
    <Link
        to={generatePath(routeMap.details.path, {id: record.id})}
        data-testid="themeName"
    >
        {record.label}
    </Link>
);

const renderAuthor  = (_value: string, record: ITheme) => (
    <Link
        to='#'
        data-testid="authorName"
    >
        {record.createdBy}
    </Link>
);

const showDeleteConfirm = (onConfirm: Function, t: TFunction) => {
    confirm({
        title: t('themes.deleteAlert'),
        icon: <ExclamationCircleOutlined />,
        okText: t('common.action.yes'),
        okType: 'danger',
        cancelText: t('common.action.no'),
        onOk: () => onConfirm(),
    });
};