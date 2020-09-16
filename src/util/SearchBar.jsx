import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Paper, ClickAwayListener, IconButton } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import CrossIcon from '@material-ui/icons/Clear'

const useStyles = makeStyles(theme => ({
    root: {
        position:'absolute',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        borderRadius: '8px',
        marginLeft: theme.spacing(28), 
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },

}));

export default function SearchBar() {
  const classes = useStyles();

  const [clickaway,setClickAway]=useState(false);

  const handleClickAway = () =>{
    setClickAway(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Paper component="form" className={classes.root} 
        style={ clickaway ? { backgroundColor:'white'}: { backgroundColor:'#f1f3f4'} }>
        <IconButton className={classes.iconButton} aria-label="menu">
        <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search..."
          inputProps={{ 'aria-label': 'search notes' }}
          onClick={()=>setClickAway(true)}
        />
        <IconButton  className={classes.iconButton} aria-label="directions">
          { clickaway && <CrossIcon /> }
        </IconButton>
      </Paper>
    </ClickAwayListener>
  );
}