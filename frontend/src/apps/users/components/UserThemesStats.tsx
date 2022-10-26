import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import { EThemeStatus } from 'apps/themes/models';
import { IUserDetails } from '../models'

const {Text} = Typography;

interface IProps {
    themesCount : IUserDetails['themesCount'];
}

export const UserThemesStats: React.FC<IProps> = (props) => {
    const {t} = useTranslation();
    const {themesCount} = props;
    return (
        <div>
            {t('users.themesAdded')}
            <div className="user-added-themes-stats">
                <div className="themes-count">
                    <Text type="success">{themesCount.accepted}</Text>
                    <div className="theme-status">
                        {t(`themes.status.${EThemeStatus.ACCEPTED}`)}
                    </div>
                </div>
                <div className="themes-count">
                    <Text type="warning">{themesCount.onModeration}</Text>
                    <div className="theme-status">
                        {t(`themes.status.${EThemeStatus.ON_MODERATION}`)}
                    </div>
                </div>
                <div className="themes-count">
                    <Text type="danger">{themesCount.declined}</Text>
                    <div className="theme-status">
                        {t(`themes.status.${EThemeStatus.DECLINED}`)}
                    </div>
                </div>
            </div>
        </div>
    );
}
