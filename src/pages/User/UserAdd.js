import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import * as Yup from 'yup';
import {
    Card,
    CardHeader,
    Stack,
    Button,
    Container,
    Typography,
    TextField,
    Grid,
    Avatar
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// components
import { useCreateUser } from '../../services/useUserServices';
import { SelectAvatar } from './components/SelectAvatar';

export const UserAdd = () => {

    const navigate = useNavigate();
    const { doRequest, data: result } = useCreateUser();
    const [openSelectAvatar, setOpenSelectAvatar] = useState(false);

    const formSchema = Yup.object().shape({
        picture: Yup.string().required(),
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        phone: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            picture: 'avatar_1.jpg',
            name: '',
            email: '',
            password: '',
            phone: '',
        },
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            await doRequest(formData);
        }
    });

    const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    useEffect(() => {
        if (result && result?.userId !== "") {
            navigate(`/app/user`, { replace: true });
        }
    }, [result, navigate]);

    return (
        <>
            <Helmet>
                <title> Panel: Usuários | Fch Store</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Adicionar Usuário
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid spacing={2} container direction={'row'}>
                            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                <Card>
                                    <CardHeader title='Dados do usuário' />
                                    <Stack margin={2} spacing={2}>
                                        <Grid container alignItems={'center'} flexDirection="column">
                                            <Grid item style={{ marginBottom: 10 }}>
                                                <Avatar sx={{ width: 128, height: 128 }} src={`/assets/images/avatars/${values.picture}`} alt="photoURL" />
                                            </Grid>
                                            <Grid item spacing={2}>
                                                <Button variant="contained" onClick={() => setOpenSelectAvatar(true)}>Alterar Avatar</Button>
                                            </Grid>
                                        </Grid>
                                        <TextField
                                            fullWidth
                                            label="Nome"
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            {...getFieldProps('email')}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Senha Temporária"
                                            {...getFieldProps('password')}
                                            error={Boolean(touched.password && errors.password)}
                                            helperText={touched.password && errors.password}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Telefone"
                                            {...getFieldProps('phone')}
                                            error={Boolean(touched.phone && errors.phone)}
                                            helperText={touched.phone && errors.phone}
                                        />
                                    </Stack>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                                <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mb={5} mt={5} spacing={2}>
                                    <Button variant="contained" color="error" size="large" component={RouterLink} to="/app/user">Cancelar</Button>
                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting}
                                    >
                                        Salvar
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                        <SelectAvatar open={openSelectAvatar} setOpen={setOpenSelectAvatar} data={values.picture} setData={(value) => setFieldValue('picture', value)} />
                    </Form>
                </FormikProvider>
            </Container >
        </>
    );
}
