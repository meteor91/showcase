//TODO: rename to hooks
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setPageName } from 'core/slices/settings';
import { getTheme } from './api';

export const useDetailsQuery = (id: string) => {
    const {status, data, refetch} = useQuery(['themeDetails', id],  () => getTheme(id));
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setPageName({name: data?.label, status}))
    }, [id, data?.label, status]);
    
    return {status, data, refetch};
};
