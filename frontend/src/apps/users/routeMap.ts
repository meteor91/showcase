import { TRoutePaths } from 'core/models';

export enum EUsersPaths {
    list = "list",
    details = "details",
    edit = "edit" ,
    create = "create"
}

export const routeMap: TRoutePaths<EUsersPaths> = {
    list: {
        path: '/users',
        name: 'users.user',
    },
    create: {
        path: '/users/create',
        name: 'common.action.create',
    },
    details: {
        path: '/users/:id/details',
        name: 'common.details',
    },
    edit: {
        path: '/users/:id/edit',
        name: 'common.action.edit',
    },
}
