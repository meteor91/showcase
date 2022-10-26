import React from 'react';
import { generatePath, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {useQuery} from 'react-query';
import { useTranslation } from 'react-i18next';
import { Table, Tag } from 'antd';
import moment from 'moment';
import { dataUtils } from 'core/utils';
import { TAppState } from 'core/store';
import { EThemeStatus, ITheme } from 'apps/themes/models';
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

// TODO: move to utils
const renderStatus = (_: string, {status}: ITheme) => {
    if (status===EThemeStatus.ACCEPTED) {
        return <Tag color="green">Accepted</Tag>;
    } else if (status===EThemeStatus.ON_MODERATION) {
        return <Tag color="orange">On moderation</Tag>;
    } else {
        return <Tag color="red">Declined</Tag>;
    }
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