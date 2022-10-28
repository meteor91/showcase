import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useQuery} from 'react-query';
import { useTranslation } from 'react-i18next';
import { Table } from 'antd';
import { dataUtils, renderDate } from 'core/utils';
import { TAppState } from 'core/store';
import { ITheme } from 'apps/themes/models';
import { renderStatus } from 'apps/themes/components/ThemeStatus';
import { routeMap } from 'apps/themes/routeMap';
import { getUserLastThemes } from '../api';

interface IProps {
    userId: string;
}

export const UserLastThemes: React.FC<IProps> = ({userId}) => {
        const {
        status: themesStatus,
        data: themesList
    } = useQuery(['userLastThemes', userId], () => getUserLastThemes(userId));
    const {t} = useTranslation();
    const locale = useSelector((state: TAppState) => state.settings.locale);
    return (
        <Table
            title={() => t('users.lastAddedThemes')}
            key={locale}
            dataSource={themesList}
            rowKey="id"
            size="small"
            loading={dataUtils.isLoading(themesStatus)}
            pagination={false}
        >
            <Table.Column
                key="label"
                title={t<string>('themes.fieldNames.label')}
                dataIndex="label"
                render={renderThemeLabel}
            />
            <Table.Column
                key="createdAt"
                title={t<string>('themes.fieldNames.createdAt')}
                dataIndex="createdAt"
                render={renderDate}
                responsive={['md']}
            />
            <Table.Column
                key="status"
                title={t<string>('themes.fieldNames.status')}
                dataIndex="status"
                render={renderStatus}
                responsive={['md']}
            />
        </Table>
    );
}

const renderThemeLabel = (_value: string, record: ITheme) => (
    <Link
        to={generatePath(routeMap.details.path, {id: record.id})}
        data-testid="themeName"
    >
        {record.label}
    </Link>
);