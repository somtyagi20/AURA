import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
import Config from 'react-native-config';
import VersionCheck from 'react-native-version-check';
import AsyncStorage from '@react-native-async-storage/async-storage';

const client = axios.create({
    baseURL: `${Config.REACT_APP_BASE_URL}`,
  });

client.defaults.headers.common['x-app-versioncode'] =
  VersionCheck.getCurrentBuildNumber();
client.defaults.headers.common['Content-Type'] = 'application/json';

export const request = async (options: AxiosRequestConfig<any>) => {
    const token = await AsyncStorage.getItem(`${Config.REACT_APP_SECRET_KEY}`);
    client.defaults.headers.common.authorization = `Bearer ${token}`;

    const onSuccess = (response: AxiosResponse) => {
        return response.data;
      };
    const onError = (error: any) => {
        if (axios.isAxiosError(error)) {
          return {error: error.message, details: error.response?.data};
        }
        return {error: 'An unexpected error occurred'};
    };
    try {
        const response = await client(options);
        return onSuccess(response);
    } catch (error) {
        throw onError(error);
    }
};
