import React from 'react';
import useStyle from '../scss/EditLabelCss';
import AddIcon from '@material-ui/icons/Add';
import { Dialog, IconButton, InputBase, Paper, Divider, Button, ListItem, ListItemIcon, ListItemText, List } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/ClearOutlined';
import DoneIcon from '@material-ui/icons/DoneOutlined';

const EditLabels = (props) => {
    
    const classes = useStyle();  

    const [btnState, setBtnState] = React.useState(false);
    const [inputState, setInputState] = React.useState(null);
    
    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} >
                <Paper className={classes.root}>
                    <Paper className={classes.paper}>
                        Edit labels
                    </Paper>

                    <Paper className={classes.paper}>
                        <List
                            dense={true}
                            disablePadding={true}
                        >
                            <ListItem dense={true} disableGutters={true}>
                                <ListItemIcon>
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={() => setBtnState(!btnState)}
                                    >
                                        {btnState ? <ClearIcon fontSize="small" /> : <AddIcon fontSize="small" />}
                                    </IconButton>
                                </ListItemIcon>
                                <ListItemText>
                                    <InputBase
                                        placeholder="Create new label"
                                        className={classes.inputBase}
                                        autoFocus={btnState}
                                        style={{ borderBottom: btnState ? '1px solid lightgray' : 'none' }}
                                        value={inputState}
                                        onChange={(e) => setInputState(e.target.value)}
                                        onClick={() => setBtnState(true)}
                                    />
                                </ListItemText>
                                <ListItemIcon>
                                    <IconButton
                                        className={classes.iconButton}
                                        onClick={() => {
                                            if (inputState !== null && inputState !== '') {
                                                alert("succes")
                                            }
                                            setInputState('')
                                        }}
                                        style={{ visibility: !btnState ? 'hidden' : 'visible' }}
                                    >
                                        <DoneIcon fontSize="small" />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        </List>

                    </Paper>
                    <Divider />

                    <Paper className={classes.paper}>
                        <Button className={classes.button} onClick={props.onClose}>
                            Done
                        </Button>
                    </Paper>
                </Paper>
            </Dialog>
        </div>
    );
};

const OpenEdit = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(null);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };
  
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open simple dialog
        </Button>
        <EditLabels selectedValue={selectedValue} open={open} onClose={handleClose} />
      </div>
    );
}

export default OpenEdit;