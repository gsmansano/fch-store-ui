import { useState } from 'react';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthConfirmEmail, AuthResendConfirmationCode } from '../../utils/userAdmin';

export const ConfirmationCodeForm = () => {
  const [isResendLoading, setIsResendLoading] = useState(false);
  const navigate = useNavigate();
  const { email } = useParams();

  const LoginSchema = Yup.object().shape({
    code: Yup.number().required('O código é obrigatório').min(6, 'Muito Curto!'),
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
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ code }) => {
      const isConfimed = await AuthConfirmEmail(email, code);
      if (isConfimed) { navigate('/login', { replace: true }); }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const resendCode = () => {
    setIsResendLoading(true);
    AuthResendConfirmationCode(email).finally(() => {
      setIsResendLoading(false);
    });
  }

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
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Enviar
        </LoadingButton>
        <Stack spacing={3} sx={{ my: 2 }}>
          <LoadingButton
            variant="text"
            fullWidth
            size="large"
            onClick={() => resendCode()}
            loading={isResendLoading}
          >
            Re-enviar código
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
