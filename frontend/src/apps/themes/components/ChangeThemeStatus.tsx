import React from 'react';
import { useMutation } from 'react-query';
import { useTranslation } from 'react-i18next';
import { Button, notification, Space } from 'antd';
import { IServerError } from 'core/models';
import { dataUtils } from 'core/utils';
import { EThemeStatus } from '../models';
import { changeThemeStatus } from '../api';

interface IProps {
    status: EThemeStatus
    themeId: string
    onSuccess: () => void;
}

export const ChangeThemeStatus: React.FC<IProps> = (props) => {
    const {status, themeId, onSuccess} = props;
    const {t} = useTranslation();
    const mutation = useMutation<{nextStatus: string}, IServerError, EThemeStatus> (
    (newStatus: EThemeStatus) => changeThemeStatus(themeId, newStatus),
    {
        onSuccess: () => onSuccess(),
        onError: (error) => {
            notification.open({
                message: error.message,
                description: error.errorCode === 'status_already_changed' ? 'Please reload page' : undefined
            });
        }
    });

    const isStatusChangeInProcess = dataUtils.isLoading(mutation.status);

    const buttons = {
        accept: (
            <Button
                type="primary"
                disabled={isStatusChangeInProcess}
                onClick={() => mutation.mutate(EThemeStatus.ACCEPTED)}
            >
                {t('common.action.accept')}
            </Button>
        ),
        decline: (
            <Button
                danger
                disabled={isStatusChangeInProcess}
                onClick={() => mutation.mutate(EThemeStatus.DECLINED)}
            >
                {t('common.action.decline')}
            </Button>
        ),
        forModeration: (
            <Button
                style={{ color: "orange", borderColor: "orange" }}
                disabled={isStatusChangeInProcess}
                onClick={() => mutation.mutate(EThemeStatus.ON_MODERATION)}
            >
                {t('common.action.forModeration')}
            </Button>
        ),
    };

    switch (status) {
        case EThemeStatus.ACCEPTED:
            return (
                <Space>
                    {buttons.forModeration}
                    {buttons.decline}
                </Space>
            )
        case EThemeStatus.ON_MODERATION:
            return (
                <Space>
                    {buttons.accept}
                    {buttons.decline}
                </Space>
            )
        case EThemeStatus.DECLINED:
            return (
                <Space>
                    {buttons.accept}
                    {buttons.forModeration}
                </Space>
            )
        default:
            return null;
    }
}
