import { Popover, Typography } from '@mui/material';
import React from 'react';

export default function PopupBox({open, anchorEl, handlePopoverClose, content}) {
    console.log("anchorEl", anchorEl)
    return ( 
        <Popover
            id="mouse-over-popover"
            sx={{
            pointerEvents: 'none',
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
        >
            <Typography variant="subtitle2" sx={{ p: 1 }}>{content}</Typography>
        </Popover>
     );
}
