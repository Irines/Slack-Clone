import React, { useEffect, useState, memo } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import DialogContentText from '@mui/material/DialogContentText';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function EditProjectName({open, setOpen, name, handleNameEdit}) {

  const [editName, setEditName] = React.useState(name)

  useEffect(() => {
    setEditName(name);
  }, [name])

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSaveChanges = () => {
    if (name !== editName) {
        handleNameEdit(editName)
    }
    handleClose()
  }

  const handleChange = (event) => {
    setEditName(event.target.value)
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Edit project name
        </BootstrapDialogTitle>
            <DialogContent>
                <DialogContentText>
                    Create appropriate name for each workspace. You can always edit it here.
                </DialogContentText>
                <TextField
                    id="outlined-name"
                    label="Project name"
                    value={editName}
                    onChange={handleChange}
                    autoFocus
                    margin="dense"
                    // id="name"
                    // label="Email Address"
                    // type="email"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseSaveChanges}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

const MemoizedEditProjectName = React.memo(EditProjectName);

export { MemoizedEditProjectName };