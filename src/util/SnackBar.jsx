import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function SnackBar (props) {

    const handleClose = () => {
        props.close();
    }

    return (
        <Snackbar open={props.opn} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
            This is a success message!
            </Alert>
        </Snackbar>

    )
}