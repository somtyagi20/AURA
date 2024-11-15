import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AuthNavigator from '../auth-navigator/AuthNavigator';
import TabNavigator from '../tab-navigator/TabNavigator';
import { useCheckAuthenticated } from '../../hooks/auth/useCheckAuthenticated';
import { authenticating } from '../../app/reducers/login/login-reducer';
import { checkUserAuthenticate } from '../../services/auth.service';


const AppNavigator = () => {
    // const authenticateQuery = useCheckAuthenticated();
    // const dispatch = useAppDispatch();
    const loginState = useAppSelector(state => state.login.status);

    // useEffect(() => {
    //   if (authenticateQuery.isLoading) {
    //     dispatch(authenticating());
    //   } else if (authenticateQuery.isSuccess && authenticateQuery.data) {
    //     checkUserAuthenticate(authenticateQuery.data);
    //   }
    // }, [authenticateQuery.isLoading, authenticateQuery.isSuccess, authenticateQuery.data, dispatch]);
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
