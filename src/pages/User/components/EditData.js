import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import {
    Stack,
    Grid,
    TextField,
    Button,
    Avatar,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useFormik, Form, FormikProvider } from 'formik';
import { useUpdateUser } from '../../../services/useUserServices';
import { VzDialog } from '../../../components/VzDialog';
import { SelectAvatar } from './SelectAvatar';

export const EditData = ({ open, setOpen, data, refreshData }) => {
    const formSchema = Yup.object().shape({
        picture: Yup.string().required(),
        name: Yup.string().required(),
        email: Yup.string().required(),
        phone: Yup.string().required(),
    });

    const { doRequest, data: success } = useUpdateUser();
    const [openSelectAvatar, setOpenSelectAvatar] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            phone: '',
            picture: 'avatar_1.jpg',
        },
        validationSchema: formSchema,
        onSubmit: async (formData) => {
            const item = {
                userId: data.userId,
                name: formData.name,
                email: formData.email,
                picture: formData.picture,
                phone: `+${formData.phone}`
            };
            doRequest(data.userId, item);
        }
    });

    const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps, setFieldValue } = formik;

    useEffect(() => {
        if (data) {
            setFieldValue('name', data.name);
            setFieldValue('email', data.email);
            setFieldValue('picture', data.picture);
            setFieldValue('phone', data.phone.replace('+', ''));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    useEffect(() => {
        if (success && open) {
            refreshData(data.userId);
            setOpen(false)
        }
    });

    return (
        <VzDialog open={open} handleClose={() => setOpen(false)} title="Editar Dados">
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
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
                            label="Telefone"
                            {...getFieldProps('phone')}
                            error={Boolean(touched.phone && errors.phone)}
                            helperText={touched.phone && errors.phone}
                        />
                    </Stack>
                    <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mt={5} spacing={2}>
                        <Button variant="contained" color="error" size="large" onClick={() => setOpen(false)}>Cancelar</Button>
                        <LoadingButton
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            Salvar
                        </LoadingButton>
                    </Stack>
                    <SelectAvatar open={openSelectAvatar} setOpen={setOpenSelectAvatar} data={values.picture} setData={(value) => setFieldValue('picture', value)} />
                </Form>
            </FormikProvider>
        </VzDialog>
    );
};

EditData.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    data: PropTypes.object,
    refreshData: PropTypes.func
};
