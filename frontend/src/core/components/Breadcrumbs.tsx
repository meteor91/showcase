import React from 'react';
import { Breadcrumb } from 'antd';
import { TRoutePaths } from 'core/models';
import { Link } from 'react-router-dom';

interface IProps<T extends string> {
    path: T[];
    routeMap: TRoutePaths<T>;
}

/**
 * Проработать возможность отображения деталей сущностей.
 */
export const Breadcrumbs = <T extends string>(props: IProps<T>): React.ReactElement => {
    const { path, routeMap } = props;

    return (
        <Breadcrumb>
            {
                path.map((item: T) => (
                    <Breadcrumb.Item key={routeMap[item].path}>
                        <Link to={routeMap[item].path}>{routeMap[item].name}</Link>
                    </Breadcrumb.Item>
                ))
            }
        </Breadcrumb>
    )
};
