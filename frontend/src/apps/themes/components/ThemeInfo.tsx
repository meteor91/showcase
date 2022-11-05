import React from 'react';
import { useTranslation } from 'react-i18next';
import { Descriptions } from 'antd';
import { renderDate } from 'core/utils';
import { renderStatusSimplified } from './ThemeStatus';
import { ITheme } from '../models';

export const ThemeInfo: React.FC<{theme: ITheme}> = ({theme}) => {
    const {t} = useTranslation();
    return (
        <Descriptions title={theme.label} column={2}>
            <Descriptions.Item label={t('themes.fieldNames.author')}>{theme.createdBy}</Descriptions.Item>
            <Descriptions.Item label={t('themes.fieldNames.createdAt')}>{renderDate(theme.createdAt)}</Descriptions.Item>
            <Descriptions.Item label={t('themes.fieldNames.status')}>{renderStatusSimplified(theme.status)}</Descriptions.Item>
            <Descriptions.Item label={t('themes.fieldNames.updatedAt')}>{renderDate(theme.updatedAt)}</Descriptions.Item>
        </Descriptions>
    )
}