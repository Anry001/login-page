import { useAuthStore } from '@features/auth';
import Container from '@mui/material/Container';
import { useLogin } from '../api/login';

import LoginForm, { LoginFormData } from './LoginForm';

const LoginPage = () => {
  const { setUserData } = useAuthStore();

  const { mutate, isLoading } = useLogin({
    config: {
      onSuccess: (data) => setUserData(data),
      onError: console.error,
    },
  });

  const handleSubmit = ({ username, password }: LoginFormData) => {
    mutate({ username, password });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <LoginForm onSubmit={handleSubmit} loading={isLoading} />
    </Container>
  );
};

export default LoginPage;
