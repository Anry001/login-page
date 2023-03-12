import { AuthData } from '@features/auth';
import axiosClient from '@lib/axios';
import { MutationConfig } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

interface RequestData {
  username: string;
  password: string;
}

export const login = async ({ username, password }: RequestData) => {
  const res = await axiosClient.post<AuthData>('/admin/api/pre-auth', {
    step: 'LOGIN',
    username,
    password,
    token: 'test token',
  });
  return res.data;
};

type MutationFnType = typeof login;

type UseLoginOptions = {
  config?: MutationConfig<MutationFnType>;
};

export const useLogin = ({ config }: UseLoginOptions = {}) => {
  return useMutation({
    ...config,
    mutationKey: ['login'],
    mutationFn: login,
  });
};
