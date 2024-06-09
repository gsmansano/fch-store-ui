import {
    Container,
    Typography,
    Stack
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { ProfileForm } from './components/ProfileForm';

export const ManagerProfileScreen = () => {
    return (
        <>
            <Helmet>
                <title> Panel: Profile | Fch Store</title>
            </Helmet>
            <Container maxWidth="xl">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Profile
                        </Typography>
                    </Stack>
                    <ProfileForm />
                </Container>
            </Container>
        </>
    );
};
