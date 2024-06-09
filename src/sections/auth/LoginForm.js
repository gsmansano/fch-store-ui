import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';

// @mui
import { Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../components/iconify';
import { useLogin } from '../../services/useAuthServices';

// ----------------------------------------------------------------------

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { doRequest, data: result, isLoading } = useLogin();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email invalid').required(),
    password: Yup.string().required()
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ email, password }) => {
      doRequest(email, password);
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  useEffect(() => {    
    if (result && result?.authenticated) {
        navigate(`/app`, { replace: true });
    }
}, [result, navigate]);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            name="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email} />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" sx={{ my: 2 }} />          

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting || isLoading}>
          Login
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
