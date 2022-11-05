import React from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'antd';
import { dataUtils } from 'core/utils';
import { Spinner } from 'core/components/Spinner';
import { ErrorResult } from 'core/components/ErrorResult';
import { useFetchPathData } from 'core/hooks/useFetchPathData';
import { UserThemesStats } from '../components/UserThemesStats';
import { UserLastThemes } from '../components/UserLastThemes';
import { getUser } from '../api';
import { IUserDetails } from '../models';
import { EUsersPaths } from '../routeMap';

/**
 * User details page.
 */
export const UserDetails: React.FC = () => {
    const params = useParams<'id'>();
    const {status, data} = useFetchPathData<IUserDetails>({
        path: ['users', EUsersPaths.details],
        params,
        displayFieldName: 'username',
        query: () => getUser(params.id),
    });

    if (dataUtils.isLoading(status)) {
        return <Spinner/>;
    } else if (dataUtils.isReady(status) && data) {
        return (
            <>
                <Row>
                    <Col span={24}>
                        <UserThemesStats themesCount={data.themesCount} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <UserLastThemes userId={params.id!}/>
                    </Col>
                </Row>
            </>
        );
    } else {
        return <ErrorResult/>;
    }
}
