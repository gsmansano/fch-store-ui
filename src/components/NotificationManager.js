import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { eventBus } from '../utils/eventBus';

export function NotificationManager() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState({ message: '', severity: 'success' });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setData({ message: '', severity: 'success' });
    };

    React.useEffect(() => {
        eventBus.on('SNACKBAR_SHOW', (p) => {
            setData({
                message: p.message,
                severity: p.severity,
            });
            setOpen(true);
        });
        return () => eventBus.off('SNACKBAR_SHOW', () => null);
    }, []);


    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}>
            <MuiAlert
                elevation={6}
                onClose={handleClose}
                severity={data.severity}
                variant="filled"
                sx={{ width: '100%' }}>
                {data.message}
            </MuiAlert>
        </Snackbar>
    );
}
