import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Col, Row, Space, Table } from 'antd';
import { dataUtils, isModerator } from 'core/utils';
import { TAppState } from 'core/store';
import { ErrorResult } from 'core/components/ErrorResult';
import { Spinner} from 'core/components/Spinner';
import { SpaceVertical } from 'core/components/SpaceVertical';
import { useFetchPathData } from 'core/hooks/useFetchPathData';
import { routeMap, ThemesPaths } from '../routeMap';
import { ChangeThemeStatus } from '../components/ChangeThemeStatus';
import { getTheme } from '../api';
import { ITheme } from '../models';
import { ThemeInfo } from '../components/ThemeInfo';

export const ThemeDetails: React.FC = () => {
    const params = useParams<'id'>();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {userRole, locale} = useSelector((state: TAppState) => ({
        userRole: state.auth.currentUser?.role,
        locale: state.settings.locale,
    }));
    const {status, data, refetch} = useFetchPathData<ITheme>({
        path: ['themes', ThemesPaths.details],
        params,
        displayFieldName: 'label',
        query: () => getTheme(params.id!),
    });

    const handleEdit = () => {
        navigate(generatePath(routeMap.edit.path, {id: params.id}));
    };

    if (dataUtils.isLoading(status)) {
        return <Spinner />;
    } else if (dataUtils.isReady(status) && data) {
        return (
            <SpaceVertical>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <ThemeInfo theme={data} />
                    </Col>
                </Row>

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Table
                            key={locale}
                            rowKey="id"
                            loading={dataUtils.isLoading(status)}
                            dataSource={data.questionSet}
                            pagination={false}
                        >
                            <Table.Column
                                key="answer"
                                title={t<string>('themes.questions.answer')}
                                dataIndex="answer"
                            />
                            <Table.Column
                                key="label"
                                title={t<string>('themes.questions.label')}
                                dataIndex="label"
                            />
                            <Table.Column
                                key="price"
                                title={t<string>('themes.questions.price')}
                                dataIndex="price"
                            />
                        </Table>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Space>
                            {isModerator(userRole) && (
                                <ChangeThemeStatus status={data.status} themeId={params.id!} onSuccess={() => refetch()}/>
                            )}
                            <Button onClick={handleEdit}>{t('common.action.edit')}</Button>
                        </Space>
                    </Col>
                </Row>
            </SpaceVertical>
        )
    } else {
        return <ErrorResult />
    }
}
