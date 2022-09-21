import {camelCase, forEach, isArray, isObject, map, snakeCase} from 'lodash';

export const isLoading = (status: string) => {
    return status === 'loading';
}

export const isError = (status: string) => {
    return status === 'error';
}

export const dataUtils = {
    isLoading: isLoading,
    isError: isError,
}

function adapt(sourceObject: any, adaptFunction: Function): any {
    if (sourceObject && sourceObject.constructor === File) {
        // Файлы
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

export const adaptFromApi = (sourceObject: any) => adapt(sourceObject, camelCase);

export const adaptToApi = (sourceObject: any) => adapt(sourceObject, snakeCase);
