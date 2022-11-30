import { Popover, Typography } from '@mui/material';
import React from 'react';

function PopupComponent({open, anchorEl, handlePopoverClose, content}) {
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

const PopupBox = React.memo(PopupComponent);

export default PopupBox;