import { camelCase, forEach, isArray, isObject, map, snakeCase } from 'lodash';
import { ELoadingStatus, TLoadingStatus } from './models';
import { EUserRole } from 'apps/users/models';
import moment from 'moment';

/**
 * Check is loading status.
 * 
 * @param ...args Current status.
 */
export const isLoading = (...args: TLoadingStatus[]) => {
    return args.some(status => status === ELoadingStatus.Loading);
}

/**
 * Check is error status.
 * 
 * @param status Current status.
 */
export const isError = (status: TLoadingStatus) => {
    return status === ELoadingStatus.Error;
}

export const isReady = (...args: TLoadingStatus[]) => {
    return args.some(status => status === ELoadingStatus.Success);
}

export const dataUtils = {
    isLoading,
    isReady,
    isError,
}

/**
 * Utility function to adapt python-backend case to ts case and vice versa.
 *
 * @param sourceObject Object to adapt.
 * @param adaptFunction Adapt strategy function.
 */
function adapt(sourceObject: any, adaptFunction: Function): any {
    if (sourceObject && sourceObject.constructor === File) {
        // files
        return sourceObject;
    } else if (isArray(sourceObject)) {
        return map(sourceObject, value => adapt(value, adaptFunction));
    } else if (isObject(sourceObject)) {
        const adaptedObject: any = {};
        forEach(sourceObject, (value, key) => {
            const adaptedKey = adaptFunction(key);
            if (isObject(value) === true || isArray(value) === true) {
                adaptedObject[adaptedKey] = adapt(value, adaptFunction);
            } else {
                adaptedObject[adaptedKey] = value;
            }
        });
        return adaptedObject;
    } else {
        // strings, numbers, etc.
        return sourceObject;
    }
}

/**
 * Adapt python-backend to ts, to work in front.
 * 
 * @param sourceObject Object to adapt.
 */
export const adaptFromApi = (sourceObject: any) => adapt(sourceObject, camelCase);


/**
 * Adapt ts to python-backend to work in server.
 * 
 * @param sourceObject Object to adapt.
 */
export const adaptToApi = (sourceObject: any) => adapt(sourceObject, snakeCase);

/**
 * Check if the role is moderator.
 *
 * @param [role] User current role.
 * TODO: figure out ?types
 */
export const isModerator = (role?: EUserRole) => role === EUserRole.MODERATOR;

export const renderDate = (date: string) => moment.utc(date).local().format('DD.MM.YY HH:mm:ss');