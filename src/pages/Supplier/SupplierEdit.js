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
import { useGetSupplierById, useUpdateSupplier } from '../../services/useSupplierServices';

export const SupplierEdit = () => {

    const navigate = useNavigate();
    const { doRequest, data: result, isLoading: isEditing } = useUpdateSupplier();
    const { data, getData } = useGetSupplierById();
    const { supplierId } = useParams();

    const [isActive, setIsActive] = useState(false);


    const formSchema = Yup.object().shape({
        name: Yup.string(),
        fullAddress: Yup.string(),
        zipCode: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'Zip Code must contain only letters and numbers'),
        contactName: Yup.string(),
        phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Phone Number must contain only digits').min(10, 'Phone Number must be at least 10 digits').max(15, 'Phone Number cannot exceed 15 digits'),
        emailAddress: Yup.string().email('Invalid email address'),
        vatNumber: Yup.string().matches(/^[a-zA-Z0-9]+$/, 'VAT Number must be alphanumeric')

    });

    const formik = useFormik({
        initialValues: {
            name: '',
            fullAddress: '',
            zipCode: '',
            contactName: '',
            phoneNumber: '',
            emailAddress: '',
            vatNumber: '',
        },
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            await doRequest(supplierId, { name: formData.name, isActive, supplierId });
        }
    });

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    useEffect(() => {
        if (result) {
            navigate(`/app/supplier`, { replace: true });
        }
    }, [result, navigate]);


    useEffect(() => {
        if (data) {
            setFieldValue('name', data.name);
            setFieldValue('fullAddress', data.fullAddress);
            setFieldValue('zipCode', data.zipCode);
            setFieldValue('contactName', data.contactName);
            setFieldValue('phoneNumber', data.phoneNumber);
            setFieldValue('emailAddress', data.emailAddress);
            setFieldValue('vatNumber', data.vatNumber);
            setIsActive(data.isActive);
        }
    }, [data, setFieldValue]);


    useEffect(() => {
        getData(supplierId);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <Helmet>
                <title> Panel: Supplier | Fch Store</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Edit Supplier
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
                                        <TextField
                                            fullWidth
                                            label="Full Address"
                                            {...getFieldProps('fullAddress')}
                                            error={Boolean(touched.fullAddress && errors.fullAddress)}
                                            helperText={touched.fullAddress && errors.fullAddress}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Zip Code"
                                            {...getFieldProps('zipCode')}
                                            error={Boolean(touched.zipCode && errors.zipCode)}
                                            helperText={touched.zipCode && errors.zipCode}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Contact Name"
                                            {...getFieldProps('contactName')}
                                            error={Boolean(touched.contactName && errors.contactName)}
                                            helperText={touched.contactName && errors.contactName}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Phone Number"
                                            {...getFieldProps('phoneNumber')}
                                            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                                            helperText={touched.phoneNumber && errors.phoneNumber}
                                        />
                                        <TextField
                                            fullWidth
                                            label="Email Address"
                                            {...getFieldProps('emailAddress')}
                                            error={Boolean(touched.emailAddress && errors.emailAddress)}
                                            helperText={touched.emailAddress && errors.emailAddress}
                                        />
                                        <TextField
                                            fullWidth
                                            label="VAT Number"
                                            {...getFieldProps('vatNumber')}
                                            error={Boolean(touched.vatNumber && errors.vatNumber)}
                                            helperText={touched.vatNumber && errors.vatNumber}
                                        />
                                    </Stack>
                                    <Stack alignItems="flex-start" style={{ paddingLeft: 20, paddingBottom: 20 }}>
                                        <FormControlLabel control={<Switch checked={isActive} onChange={event => setIsActive(event.target.checked)} />} label="Is Active?" />
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
