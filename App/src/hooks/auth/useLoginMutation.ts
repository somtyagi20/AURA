import {useMutation} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {authAPIs} from '../api-urls/auth-urls/index';
import {Alert} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../../app/reducers/login/login-reducer';

export const loginUser = async ({phone_number, password} : Login) => {
  const response: TServerResponse = await request({
    url: authAPIs.LOGIN,
    method: 'POST',
    data: {phone_number,password},
  });
  return response;
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (response) => {
        if (response?.statusCode === 200) {
            const token = response.data?.token;
            const user = response.data?.user;
            dispatch(
              login({
                token: token,
                user: {
                  id: user._id,
                  phone_number: user.phone_number,
                  name: user.name,
                },
              }),
            );
          } else {
        Alert.alert(
          'Login Failed',
          response.message || 'Something went wrong',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        );
      }
    },
    onError: (error) => {
      Alert.alert(
        'Login Failed',
        error.message || 'Something went wrong',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    },
  });
};
