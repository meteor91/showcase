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
        name: 'Тематики',
    },
    create: {
        path: '/themes/create',
        name: 'Создать',
    },   
    details: {
        path: '/themes/:id/details',
        name: 'Детали',
    },
    edit: {
        path: '/themes/:id/edit',
        name: 'Редактировать',
    },
}