import * as React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
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
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default function MessageBox(props) {
    const [open, setOpen] = React.useState(props.isOpen);

    useEffect(()=>{
        if(props.isOpen){
            handleClose();
        }
    },[props.isOpen]);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={true}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.dialogTitle}
                </BootstrapDialogTitle>
                <DialogContent dividers>
                  <p className="Paragraph">{props.message}</p>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        {props.buttonText}
                    </Button>
                    <Button onClick={props.action}>{props.actionButtonText}</Button>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}