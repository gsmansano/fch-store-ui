import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthForgotPasswordNewPwd } from '../../utils/userAdmin';
import Iconify from '../../components/iconify';

export const ConfirmationForgotPasswordForm = () => {
  const navigate = useNavigate();
  const { email } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    code: Yup.number().required('O código é obrigatório').min(6, 'Muito Curto!'),
    password: Yup.string().required('A nova senha é obrigatório').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@.$!%*#_+-?&])[A-Za-z\d@$!%*._#+-?&]{8,}$/,"Deve conter 8 Characters, Uma maiúscula, Uma minúscula, Um número e um símbolo"),
    confirmPassword: Yup.string().required('Confirme a sua nova senha').oneOf([Yup.ref('password'), null], 'Senhas não combinam')
  });

  const formatEmail = (emailStr) => {
    const finalPart = emailStr.substr(emailStr.indexOf('@'));
    const firstPart = emailStr.substr(0, emailStr.indexOf('@'));
    const totalCharacteres = firstPart.length;
    const chars = [...Array(totalCharacteres - 2)].map(() => '*').join('');

    return `${firstPart[0]}${chars}${firstPart[totalCharacteres - 1]}${finalPart}`;
  }

  const formik = useFormik({
    initialValues: {
      code: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ code, password }) => {

      const isChanged = await AuthForgotPasswordNewPwd(email, code, password);

      if (isChanged) {
        navigate('/login', { replace: true });
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <Typography>
            O código foi enviado para {formatEmail(email)}
          </Typography>
        </Stack>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            label="Código"
            {...getFieldProps('code')}
            error={Boolean(touched.code && errors.code)}
            helperText={touched.code && errors.code}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="Nova Senha"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />               
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showConfirmPassword ? 'text' : 'password'}
            label="Confirmar Nova Senha"
            {...getFieldProps('confirmPassword')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowConfirmPassword} edge="end">
                    <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Alterar Senha
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
