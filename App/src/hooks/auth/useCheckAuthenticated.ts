import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {request} from '../../services/axios.service';
import {authAPIs} from '../api-urls/auth-urls/index';

const getProfile = async (): Promise<TServerResponse> => {
  const response = await request({
    url: authAPIs.GETPROFILE,
    method: 'GET',
  });
  return response;
};

export const useCheckAuthenticated = () : UseQueryResult<TServerResponse, Error> => {
  return useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
  });
};
