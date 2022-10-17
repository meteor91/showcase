import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import enUS from 'antd/es/locale/en_US';
import ruRU from 'antd/es/locale/ru_RU';
import { ConfigProvider as AntDConfigProvider } from 'antd';
import moment from 'moment';
import {TAppState} from 'core/store';

interface IProps {
    children: React.ReactNode;
}

export const ConfigProvider: React.FC<IProps> = ({children}) => {
    const [locale, setLocal] = useState(enUS);
    const localeCode = useSelector((state: TAppState) => state.settings.locale);

    useEffect(() => {
        if (localeCode === 'EN') {
            moment.locale('en')
            setLocal(enUS);
        } else {
            moment.locale('ru')
            setLocal(ruRU);
        }
    }, [localeCode])

    return (
        <AntDConfigProvider locale={locale}>
            {children}
        </AntDConfigProvider>
    )
}