import { useMutation } from '@tanstack/react-query';
import { request } from '../../services/axios.service';
import { authAPIs } from '../api-urls/auth-urls';
import { useNavigation } from '@react-navigation/native';
import { TAuthNavigator } from '../../navigation/auth-navigator/AuthNavigator';

const signUpUser = async ({ phone_number, name, password }: SignUp) => {
    const response = await request({
        url: authAPIs.SIGNUP,
        method: 'POST',
        data: {phone_number, name, password},
    });
    return response.data;
};

export const useSignUpMutation = () => {
    const { navigate } = useNavigation<TAuthNavigator>();
    return useMutation({
        mutationFn: signUpUser,
        onSuccess: () => {
            navigate('Login');
        },
    });
};
