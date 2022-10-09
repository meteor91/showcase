import { Breadcrumbs } from 'core/components/Breadcrumbs';
import { ContentLayout } from 'core/components/ContentLayout';
import { Route } from 'react-router-dom'
import { ThemeCreate } from './pages/ThemeCreate';
import { ThemeDetails } from './pages/ThemeDetails';
import { ThemeEdit } from './pages/ThemeEdit';
import { ThemesList } from './pages/ThemesList';
import { routeMap, ThemesPaths } from './routeMap';

export const themesRoutes = () => {
    return (
        <Route path="themes">
            <Route path="" element={
                <ContentLayout
                    breadcrumbs={<Breadcrumbs<ThemesPaths> routeMap={routeMap} path={[ThemesPaths.list]}/>}
                    content={<ThemesList/>}
                />
            }/>
            <Route path="create" element={
                <ContentLayout
                    breadcrumbs={<Breadcrumbs<ThemesPaths> routeMap={routeMap} path={[ThemesPaths.list, ThemesPaths.create]}/>}
                    content={<ThemeCreate/>}
                />
            }/>
            <Route path=":id/edit" element={
                <ContentLayout
                    breadcrumbs={<Breadcrumbs<ThemesPaths> routeMap={routeMap} path={[ThemesPaths.list,  ThemesPaths.details, ThemesPaths.edit]}/>}
                    content={<ThemeEdit/>}
                />
            }/>

            <Route path=":id/details" element={
                <ContentLayout 
                    breadcrumbs={<Breadcrumbs<ThemesPaths> routeMap={routeMap} path={[ThemesPaths.list, ThemesPaths.details]}/>}
                    content={<ThemeDetails/>}
                />
            }/>
        </Route>    
    );
}
