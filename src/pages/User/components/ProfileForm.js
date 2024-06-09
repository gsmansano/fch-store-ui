import { useEffect } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Button,
  Stack,
  TextField
} from '@mui/material';
import * as Yup from 'yup';
import { LoadingButton } from '@mui/lab';
import { jwtDecode } from "jwt-decode";
import { styled } from '@mui/material/styles';
import { eventBus } from '../../../utils/eventBus';

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
}));

export const ProfileForm = () => {

  const schema = Yup.object().shape({
    fullname: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Full name required'),
    eamil: Yup.string().email().required()
  });

  const formik = useFormik({
    initialValues: {
      fullname: '',
      email: ''
    },
    validationSchema: schema,
    onSubmit: async (formProps) => {
      const userData = {
        fullname: formProps.fullname,
        email: formProps.email
      };

      console.log(userData);

      const isSaved = false;

      if (isSaved) {
        const message = 'Profile updated with success';
        eventBus.emit('SNACKBAR_SHOW', { severity: 'success', message });
        window.location.href = '/app'
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue, values } = formik;

  useEffect(() => {
    const decoded = jwtDecode(localStorage.getItem("TOKEN"));

    setFieldValue('fullname', decoded.Fullname);
    setFieldValue('email', decoded.Email);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Card>
          <RootStyle>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Full Name"
                {...getFieldProps('fullname')}
                error={Boolean(touched.fullname && errors.fullname)}
                helperText={touched.fullname && errors.fullname}
              />
              <TextField
                fullWidth
                label="Email Address (Disabled)"
                value={values.email}
              />
              <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mb={5} spacing={2}>
                <Button variant="contained" color="error" size="large" component={RouterLink} to="/app">Cancel</Button>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                >
                  Save
                </LoadingButton>
              </Stack>
            </Stack>
          </RootStyle>
        </Card>
      </Form>
    </FormikProvider>
  );
};
