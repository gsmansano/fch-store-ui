import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { AuthForgotPassword } from '../../utils/userAdmin';

export const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Coloque um email válido').required('Email é um campo obrigatório'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: LoginSchema,
    onSubmit: async ({ email }) => {
      const isComplete = await AuthForgotPassword(email);

      if (isComplete) {
        navigate(`/confirmation-forgot-password/${email}`, { replace: true });
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
          <TextField
            fullWidth
            autoComplete="email"
            type="email"
            label="Email"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Stack>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Enviar Email
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
