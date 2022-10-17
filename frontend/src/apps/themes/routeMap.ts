import { TRoutePaths } from 'core/models';

export enum ThemesPaths {
    list = "list",
    details = "details",
    edit = "edit" ,
    create = "create"
}

export const routeMap: TRoutePaths<ThemesPaths> = {
    list: {
        path: '/themes',
        name: 'themes.theme',
    },
    create: {
        path: '/themes/create',
        name: 'common.action.create',
    },   
    details: {
        path: '/themes/:id/details',
        name: 'common.details',
    },
    edit: {
        path: '/themes/:id/edit',
        name: 'common.action.edit',
    },
}
