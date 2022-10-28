import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Col, Descriptions, Row, Space, Table } from 'antd';
import { dataUtils, isModerator, renderDate } from 'core/utils';
import { TAppState } from 'core/store';
import { ErrorResult } from 'core/components/ErrorResult';
import { Spinner} from 'core/components/Spinner';
import { SpaceVertical } from 'core/components/SpaceVertical';
import { routeMap } from '../routeMap';
import { useDetailsQuery } from '../queries';
import { ChangeThemeStatus } from '../components/ChangeThemeStatus';
import { renderStatusSimplified } from '../components/ThemeStatus';

export const ThemeDetails: React.FC = () => {
    const params = useParams();    
    const {status, data, refetch} = useDetailsQuery(params.id!)
    const {userRole, locale} = useSelector((state: TAppState) => ({
        userRole: state.auth.currentUser?.role,
        locale: state.settings.locale,
    }));
    const navigate = useNavigate();
    const {t} = useTranslation();

    const handleEdit = () => {
        navigate(generatePath(routeMap.edit.path, {id: params.id}));
    }

    if (dataUtils.isLoading(status)) {
        return <Spinner />;
    } else if (dataUtils.isReady(status) && data) {
        return (
            <SpaceVertical>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Descriptions title={data.label} column={2}>
                            <Descriptions.Item label={t('themes.fieldNames.author')}>{data.createdBy}</Descriptions.Item>
                            <Descriptions.Item label={t('themes.fieldNames.createdAt')}>{renderDate(data.createdAt)}</Descriptions.Item>
                            <Descriptions.Item label={t('themes.fieldNames.status')}>{renderStatusSimplified(data.status)}</Descriptions.Item>
                            <Descriptions.Item label={t('themes.fieldNames.updatedAt')}>{renderDate(data.updatedAt)}</Descriptions.Item>
                        </Descriptions>
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
