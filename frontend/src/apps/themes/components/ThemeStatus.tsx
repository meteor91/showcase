import React from 'react';
import {useTranslation} from 'react-i18next';
import {Tag} from 'antd';
import {EThemeStatus} from '../models';

interface IProps {
    status: EThemeStatus;
    simplified?: boolean;
}

export const ThemeStatus: React.FC<IProps> = ({status, simplified}) => {
    const {t} = useTranslation();
    const statusLabel = t(`themes.status.${status}`);

    if (simplified) {
        return  <span>{statusLabel}</span>;
    }

    if (status===EThemeStatus.ACCEPTED) {
        return <Tag color="green">{statusLabel}</Tag>;
    } else if (status===EThemeStatus.ON_MODERATION) {
        return <Tag color="orange">{statusLabel}</Tag>;
    } else {
        return <Tag color="red">{statusLabel}</Tag>;
    }
}

export const renderStatus = (status: EThemeStatus) => <ThemeStatus status={status} />;

export const renderStatusSimplified = (status: EThemeStatus) => <ThemeStatus status={status} simplified />;