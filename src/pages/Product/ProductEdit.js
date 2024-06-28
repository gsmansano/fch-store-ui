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
    FormControlLabel,
    Switch,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// components
import { useGetProductById, useUpdatePartner } from '../../services/useProductServices';

export const ProductEdit = () => {

    const navigate = useNavigate();
    const { doRequest, data: result, isLoading: isEditing } = useUpdatePartner();
    const { data, getData } = useGetProductById();
    const { productId } = useParams();

    const [isActive, setIsActive] = useState(false);


    const formSchema = Yup.object().shape({
        name: Yup.string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            isActive: false
        },
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            await doRequest(productId, { name: formData.name, isActive, productId });
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    useEffect(() => {
        if (result && result?.partnerId !== "") {
            navigate(`/app/product`, { replace: true });
        }
    }, [result, navigate]);


    useEffect(() => {
        if (data) {
            setFieldValue('name', data.name);
            setIsActive(data.isActive);
        }
    }, [data, setFieldValue]);


    useEffect(() => {
        getData(productId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <Helmet>
                <title> Panel: Product | Fch Store</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Product
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
                                    <Stack alignItems="flex-start" style={{ paddingLeft: 20, paddingBottom: 20 }}>
                                        <FormControlLabel control={<Switch checked={isActive} onChange={event => setIsActive(event.target.checked)} />} label="Is Active?" />
                                    </Stack>
                                </Card>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mb={5} mt={5} spacing={2}>
                                    <Button variant="contained" color="error" size="large" component={RouterLink} to="/app/partner">Cancel</Button>
                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        loading={isSubmitting || isEditing}
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
