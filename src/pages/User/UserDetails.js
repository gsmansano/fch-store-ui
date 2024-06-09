import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    Card,
    CardHeader,
    Stack,
    Container,
    Typography,
    TextField,
    Grid,
    IconButton,
    MenuItem,
    FormControlLabel,
    Switch,
    Avatar
} from '@mui/material';
import {  useParams } from 'react-router-dom';
import Iconify from '../../components/iconify';
import { useGetUserById } from '../../services/useUserServices';
import { EditMenu } from '../../components/EditMenu';
import { EditData } from './components/EditData';

export const UserDetails = () => {

    const { userId } = useParams();
    const [openEditData, setOpenEditData] = useState(null);
    const [popupEditData, setPopupOpenEditData] = useState(false);
    const [openEditUserStatus, setOpenEditUserStatus] = useState(null);
    const [popupEditUserStatus, setPopupOpenEditUserStatus] = useState(false);
    const [userData, setUserData] = useState({
        picture: 'avatar_1.jpg',
        name: '',
        email: '',
        phone: '',
        isActive: false
    });

    const { data: result, getData } = useGetUserById();

    useEffect(() => {
        if (result) {
            setUserData(result);
        }
    }, [result])

    useEffect(() => {
        if (userId !== null) {
            getData(userId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    return (
        <>
            <Helmet>
                <title> Panel: Usuários | Fch Store</title>
            </Helmet>
            <Container maxWidth="xl">
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Detalhes do Usuário
                    </Typography>
                </Stack>
                <Grid spacing={2} container direction={'row'}>
                    <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
                        <Card>
                            <CardHeader title='Dados sobre o usuário'
                                action={
                                    <IconButton aria-label="settings" onClick={event => setOpenEditData(event.currentTarget)}>
                                        <Iconify icon={'eva:more-vertical-fill'} />
                                    </IconButton>
                                } />
                            <Stack margin={2} spacing={2}>
                                <Grid container alignItems={'center'} flexDirection="column">
                                    <Grid item style={{ marginBottom: 10 }}>
                                        <Avatar sx={{ width: 128, height: 128 }} src={`/assets/images/avatars/${userData.picture}`} alt="photoURL" />
                                    </Grid>                                   
                                </Grid>
                                <TextField
                                    fullWidth
                                    label="Nome"
                                    value={userData.name}
                                />
                                <TextField
                                    fullWidth
                                    label="Email"
                                    value={userData.email}
                                />
                                <TextField
                                    fullWidth
                                    label="Telefone"
                                    value={userData.phone}
                                />
                            </Stack>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                        <Card>
                            <CardHeader title='Usuário ativo?'
                                action={
                                    <IconButton aria-label="settings" onClick={event => setOpenEditUserStatus(event.currentTarget)}>
                                        <Iconify icon={'eva:more-vertical-fill'} />
                                    </IconButton>
                                } />
                            <Stack margin={2} spacing={2}>
                                <Stack alignItems="flex-end">
                                    <FormControlLabel control={<Switch checked={userData.isActive} />} label="Está Ativo?" />
                                </Stack>
                            </Stack>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
            <EditMenu
                openComponent={openEditData}
                setOpenComponent={setOpenEditData}
            >
                <MenuItem onClick={() => setPopupOpenEditData(true)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Editar
                </MenuItem>
            </EditMenu>
            <EditMenu
                openComponent={openEditUserStatus}
                setOpenComponent={setOpenEditUserStatus}
            >
                <MenuItem onClick={() => setPopupOpenEditUserStatus(true)}>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Editar
                </MenuItem>
            </EditMenu>
            <EditData data={userData} open={popupEditData} setOpen={setPopupOpenEditData} refreshData={getData} />
        </>
    );
}
