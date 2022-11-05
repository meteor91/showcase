import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Breadcrumb, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { ELoadingStatus, TRoutePaths } from 'core/models';
import { TAppState } from 'core/store';

interface IProps<T extends string> {
    paths: T[];
    routeMap: TRoutePaths<T>;
}

const loadingIcon = <LoadingOutlined style={{ fontSize: 14 }} />;

export const Breadcrumbs = <T extends string>(props: IProps<T>): React.ReactElement => {
    const {paths, routeMap} = props;

    const breadcrumbs = useSelector((state: TAppState) => state.settings.breadcrumbs);
    const {t} = useTranslation();

    const items = paths.map((item: T, index) => {
        const isLastItem = index === paths.length - 1;
        let label;
        if (routeMap[item].asyncLabel) {
            if (!breadcrumbs[item] || breadcrumbs[item].status === ELoadingStatus.Loading) {
                label = <Spin indicator={loadingIcon} />;
            } else if (breadcrumbs[item].status === ELoadingStatus.Success) {
                if (!isLastItem) {
                    label = <Link to={breadcrumbs[item].link}>{breadcrumbs[item].label}</Link>;
                } else {
                    label = breadcrumbs[item].label;
                }

            } else if (breadcrumbs[item].status === ELoadingStatus.Error) {
                label = t(routeMap[item].name);
            }
        } else {
            label = <Link to={routeMap[item].path}>{t(routeMap[item].name)}</Link>;
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

export const createBreadcrumbs = <T extends string>(routeMap: TRoutePaths<T>): React.FC<Omit<IProps<T>, 'routeMap'>> => {
    return ({paths}: Omit<IProps<T>, 'routeMap'>) => {
        return <Breadcrumbs paths={paths} routeMap={routeMap} />
    }
}
