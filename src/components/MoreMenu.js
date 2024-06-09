import { useRef, useState } from 'react';
import { Menu, IconButton } from '@mui/material';
import Iconify from './iconify';

// eslint-disable-next-line react/prop-types
export const MoreMenu = ({ children }) => {
    const ref = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => setIsOpen(true);

    return (
        <>
            <IconButton ref={ref} onClick={() => openMenu()}>
                <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
            <Menu
                open={isOpen}
                anchorEl={ref.current}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: { width: 200, maxWidth: '100%' }
                }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {children}
            </Menu>
        </>
    );
};
