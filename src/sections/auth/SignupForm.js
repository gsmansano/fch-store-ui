import * as Yup from 'yup';
import { useState } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthSignUp } from '../../utils/userAdmin';
import { eventBus } from '../../utils/eventBus';
import Iconify from '../../components/iconify';

export const SignupForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, 'Muito Curto!')
      .max(50, 'Muito Longo!')
      .required('Full name required'),
    email: Yup.string().email('Coloque um email válido').required('Email é obrigatório'),
    phone: Yup.number().required('Phone required'),
    password: Yup.string().required('A nova senha é obrigatório').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.$!%*#_+-?&])[A-Za-z\d@$!%*._#+-?&]{8,}$/,"Deve conter 8 Characters, Uma maiúscula, Uma minúscula, Um número e um símbolo"),
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: '',
      phone: '',
      password: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (formProps) => {
      const userData = {
        username: formProps.email,
        password: formProps.password,
        attributes: {
          name: formProps.fullname,
          email: formProps.email,
          phone_number: `+${formProps.phone}`,
        }
      };

      const isAdded = await AuthSignUp(userData);

      if (isAdded) {
        eventBus.emit('SNACKBAR_SHOW', { severity: 'success', message: 'Register with success' });
        navigate(`/confirm-email/${formProps.email}`, { replace: true });
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            label="Nome Completo"
            {...getFieldProps('fullname')}
            error={Boolean(touched.fullname && errors.fullname)}
            helperText={touched.fullname && errors.fullname}
          />
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
          <TextField
            fullWidth
            label="Phone"
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="add" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Password"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Cadastrar
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
};
