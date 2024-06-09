import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Stack, Button, Avatar, IconButton, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';
import { VzDialog } from '../../../components/VzDialog';

const AVATARES = [
    'avatar_1.jpg',
    'avatar_2.jpg',
    'avatar_3.jpg',
    'avatar_4.jpg',
    'avatar_5.jpg',
    'avatar_6.jpg',
    'avatar_7.jpg',
    'avatar_8.jpg',
    'avatar_9.jpg',
    'avatar_10.jpg',
    'avatar_11.jpg',
    'avatar_12.jpg',
    'avatar_13.jpg',
    'avatar_14.jpg',
    'avatar_15.jpg',
    'avatar_16.jpg',
    'avatar_17.jpg',
    'avatar_18.jpg',
    'avatar_19.jpg',
    'avatar_20.jpg',
    'avatar_21.jpg',
    'avatar_22.jpg',
    'avatar_23.jpg',
    'avatar_24.jpg',
    'avatar_25.jpg'
];


export const SelectAvatar = ({ open, setOpen, data, setData }) => {
    const theme = useTheme();
    const [image, setImage] = useState('avatar_1.jpg');

    const onSubmit = async () => {
        setData(image);
        setOpen(false)
    }

    useEffect(() => {
        if (data) {
            setImage(data);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <VzDialog open={open} handleClose={() => setOpen(false)} title="Avatares">
            <Stack margin={2} spacing={2}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                    {AVATARES.map(p => (
                        <Grid key={p} style={{ backgroundColor: image === p ? theme.palette.grey[300] : null }}>
                            <IconButton onClick={() => setImage(p)} style={{ borderColor: 'red' }}>
                                <Avatar sx={{ width: 64, height: 64 }} src={`/assets/images/avatars/${p}`} alt="photoURL" />
                            </IconButton>
                        </Grid>
                    ))}
                </Grid>
            </Stack>
            <Stack direction="row" alignItems="flex-end" justifyContent="flex-end" mt={5} spacing={2}>
                <Button variant="contained" color="error" size="large" onClick={() => setOpen(false)}>Cancelar</Button>
                <LoadingButton
                    size="large"
                    variant="contained"
                    onClick={onSubmit}
                >
                    Selecionar
                </LoadingButton>
            </Stack>
        </VzDialog>
    );
};

SelectAvatar.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    data: PropTypes.object,
    setData: PropTypes.func
};
