import { TRoutePaths } from 'core/models';

export enum ThemesPaths {
    list = "list",
    details = "details",
    edit = "edit" ,
    create = "create"
}

export const routeMap: TRoutePaths<ThemesPaths> = {
    [ThemesPaths.list]: {
        path: '/themes',
        name: 'themes.theme',
    },
    [ThemesPaths.create]: {
        path: '/themes/create',
        name: 'common.action.create',
    },   
    [ThemesPaths.details]: {
        path: '/themes/:id/details',
        name: 'common.details',
        asyncLabel: true,
    },
    [ThemesPaths.edit]: {
        path: '/themes/:id/edit',
        name: 'common.action.edit',
    },
}
