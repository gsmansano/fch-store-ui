import { useEffect } from 'react';
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
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// components
import { useCreateSupplier } from '../../services/useSupplierServices';

export const SupplierAdd = () => {

    const navigate = useNavigate();
    const { doRequest, data: result, isLoading } = useCreateSupplier();

    const formSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            await doRequest(formData);
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

    useEffect(() => {
        if (result && result?.supplierId !== "") {
            navigate(`/app/supplier`, { replace: true });
        }
    }, [result, navigate]);

    return (
        <>
            <Helmet>
                <title> Panel: Supplier | Fch Store</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        New Supplier
                    </Typography>
                </Stack>
                <FormikProvider value={formik}>
                    <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                        <Grid spacing={2} container direction={'row'}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Card>
                                    <CardHeader title='Form' />
                                    <Stack margin={2} spacing={2}>
                                        <TextField
                                            fullWidth
                                            label="Name"
                                            {...getFieldProps('name')}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Stack>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mb={5} mt={5} spacing={2}>
                                    <Button variant="contained" color="error" size="large" component={RouterLink} to="/app/supplier">Cancel</Button>
                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting || isLoading}
                                    >
                                        Save
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Form>
                </FormikProvider>
            </Container >
        </>
    );
}
