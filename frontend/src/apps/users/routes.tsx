import { Breadcrumbs } from 'core/components/Breadcrumbs';
import { ContentLayout } from 'core/components/ContentLayout';
import { Route } from 'react-router-dom'
import { UsersList } from './pages/UsersList';
import { UserDetails } from './pages/UserDetails';
import { EUsersPaths, routeMap } from './routeMap';


export const usersRoutes = () => {
    return (
        <Route path="users">
            <Route path="" element={
                <ContentLayout
                    breadcrumbs={<Breadcrumbs<EUsersPaths> routeMap={routeMap} path={[EUsersPaths.list]}/>}
                    content={<UsersList/>}
                />
            }/>
            <Route path=":id/details" element={
                <ContentLayout
                    breadcrumbs={<Breadcrumbs<EUsersPaths> routeMap={routeMap} path={[EUsersPaths.list, EUsersPaths.details]}/>}
                    content={<UserDetails/>}
                />
            }/>
        </Route>
    )
}
