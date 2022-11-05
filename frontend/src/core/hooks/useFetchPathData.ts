import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery, UseQueryOptions } from 'react-query';
import { setBreadcrumb } from 'core/slices/settings';
import { generatePath } from 'react-router-dom';
import { routeMap } from '../routeMap';

interface IOptions<T> {
    path: [module: keyof typeof routeMap, pathName: string];
    params: Record<string, string | undefined>;
    displayFieldName: keyof T;
    query: () => Promise<T>,
    queryOptions?: Omit<UseQueryOptions<unknown, unknown, T>, 'queryKey' | 'queryFn'>
}

export const useFetchPathData = <T>(options: IOptions<T>) => {
    const {path: [module, pathName], params, displayFieldName, query, queryOptions} = options;

    const { status, data, refetch, isRefetching} = useQuery<unknown, unknown, T>(
        [pathName, params],
        query,
        queryOptions,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setBreadcrumb({
            link: generatePath(routeMap[module].details.path, params),
            name: pathName,
            label: data?.[displayFieldName],
            status,
        }));
    //TODO подумать о deps
    }, [dispatch, pathName, displayFieldName, status, data, module, params]);

    return {status, data, refetch, isRefetching};
};
