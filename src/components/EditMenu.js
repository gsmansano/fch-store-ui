import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@mui/material';

export const EditMenu = ({ openComponent, setOpenComponent, children }) => (
        <Popover
            open={Boolean(openComponent)}
            anchorEl={openComponent}
            onClose={() => setOpenComponent(null)}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
                sx: {
                    p: 1,
                    '& .MuiMenuItem-root': {
                        px: 1,
                        typography: 'body2',
                        borderRadius: 0.75,
                    },
                },
            }}
        >
            {children}
        </Popover>
    )

EditMenu.propTypes = {
    openComponent: PropTypes.object,
    setOpenComponent: PropTypes.func,
    children: PropTypes.node
};
