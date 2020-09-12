import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function SnackBar (props) {

    const handleClose = () => {
        props.close();
    }

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }} 
            open={props.opn} autoHideDuration={3000} onClose={handleClose}>
            <Alert severity={props.severity}>
                {props.msg}
            </Alert>
        </Snackbar>

    )
}