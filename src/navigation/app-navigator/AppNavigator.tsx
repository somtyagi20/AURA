import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import AuthNavigator from '../auth-navigator/AuthNavigator';
import { TabNavigator } from '../tab-navigator/TabNavigator';

const AppNavigator = () => {
    const loginState = useAppSelector((state: RootState) => state.login.status);
    switch(loginState){
        case 'authenticating':
            return <AuthNavigator/>;
        case 'loggedIn':
            return <TabNavigator/>;
        case 'logout':
            return <AuthNavigator/>;
        case 'forceUpdate':
            return <AuthNavigator/>;
        }
};

export default AppNavigator;
