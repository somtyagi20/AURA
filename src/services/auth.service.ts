import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {forceUpdate, login, logout} from '../app/reducers/login/login-reducer';
import {store} from '../app/store';

export const checkUserAuthenticate = async (response: TServerResponse) => {
  try {
    if (response.statusCode === 400 || response.statusCode === 403) {
        store.dispatch(logout());
      } else if (response.statusCode === 202) {
        store.dispatch(forceUpdate());
      } else if (response.success === true) {
        const token = await AsyncStorage.getItem(`${Config.REACT_APP_SECRET_KEY}`);
        if (token) {
          const user = {
            id: response.data?.user?._id,
            phone_number: response.data?.user?.phone_number,
            name: response.data?.user?.name,
          };
  
          if (user.id && user.phone_number && user.name) {
            store.dispatch(login({ token, user }));
          } else {
            console.error('User data is incomplete:', user);
            store.dispatch(logout());
          }
        } else {
          store.dispatch(logout());
        }
      } else if (response.success === false) {
        store.dispatch(logout());
        console.log({
          title: response.title,
          message: response.message,
        });
      }
  } catch (error) {
    console.error('Error in authentication flow:', error);
    store.dispatch(logout());
  }
};
