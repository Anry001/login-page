import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@components/LoadingButton';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export interface LoginFormData {
  username: string;
  password: string;
  rememberMe: boolean;
}

const LOGIN_TITLE = 'Welcome to the Admin Login Page';
const SIGNIN_BUTTON_TEXT = 'Sign In';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  loading?: boolean;
}

const LoginForm = ({ onSubmit, loading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { register, handleSubmit } = useForm<LoginFormData>();

  return (
    <Stack
      onSubmit={handleSubmit(onSubmit)}
      direction="column"
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      component="form"
    >
      <Typography textAlign="center" variant="h5">
        {LOGIN_TITLE}
      </Typography>
      <TextField
        fullWidth
        required
        label="User Name"
        {...register('username')}
      />
      <TextField
        fullWidth
        required
        {...register('password', { required: 'Password required' })}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <LoadingButton type="submit" variant="contained" loading={loading}>
        {SIGNIN_BUTTON_TEXT}
      </LoadingButton>
    </Stack>
  );
};

export default LoginForm;
