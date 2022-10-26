import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setPageName } from 'core/slices/settings';
import { getUser } from './api';

export const useUserDetailsQuery = (id: string) => {
    const {status, data} = useQuery(['userDetails', id],  () => getUser(id));
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(setPageName({name: data?.username, status}))
    }, [id, data?.username, status]);
    
    return {status, data};
};
