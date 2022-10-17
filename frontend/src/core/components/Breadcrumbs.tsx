import React from 'react';
import { useSelector } from 'react-redux';
import {useTranslation} from 'react-i18next';
import { Breadcrumb, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { TRoutePaths } from 'core/models';
import { Link } from 'react-router-dom';
import { TAppState } from 'core/store';

interface IProps<T extends string> {
    path: T[];
    routeMap: TRoutePaths<T>;
}

const antIcon = <LoadingOutlined style={{ fontSize: 14 }} spin />;

export const Breadcrumbs = <T extends string>(props: IProps<T>): React.ReactElement => {
    const {path, routeMap} = props;
    const pageName = useSelector((state: TAppState) => state.settings.pageName);
    const {t} = useTranslation();

    const items = path.map((item: T) => {
        let label: React.ReactNode = <Link to={routeMap[item].path}>{t(routeMap[item].name)}</Link>;
        if (item === 'details') {
            if (pageName.status === 'success') {
                label = pageName.name;
            } else if (pageName.status === 'loading') {
                label = <Spin indicator={antIcon} />;
            }
        }

        return (
            <Breadcrumb.Item key={routeMap[item].path}>
                {label}
            </Breadcrumb.Item>
        )
    });

    return (
        <Breadcrumb>
            {items}
        </Breadcrumb>
    )
};
