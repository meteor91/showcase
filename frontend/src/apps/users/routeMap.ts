import { TRoutePaths } from 'core/models';

export enum EUsersPaths {
    list = "list",
    details = "details",
    edit = "edit" ,
    create = "create"
}

export const routeMap: TRoutePaths<EUsersPaths> = {
    [EUsersPaths.list]: {
        path: '/users',
        name: 'users.user',
    },
    [EUsersPaths.create]: {
        path: '/users/create',
        name: 'common.action.create',
    },
    [EUsersPaths.details]: {
        path: '/users/:id/details',
        name: 'common.details',
        asyncLabel: true,
    },
    [EUsersPaths.edit]: {
        path: '/users/:id/edit',
        name: 'common.action.edit',
    },
}
