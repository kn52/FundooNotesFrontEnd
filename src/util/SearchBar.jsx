import React, { useState, useEffect } from 'react';
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
  const [width,setWidth]=useState(0);
  const [searchText,setSearchText]=useState('');

  const displaySearch = (
    <>
      <IconButton className={classes.iconButton} aria-label="menu">
          <SearchIcon />
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={searchText}
          inputProps={{ 'aria-label': 'search notes' }}
          onChange={ (e) => {setSearchText({searchText:e.target.value})} }
          onClick={()=>setClickAway(true)}
        />
        <IconButton  className={classes.iconButton} aria-label="directions">
          { clickaway && <CrossIcon /> }
        </IconButton>
    </>
  )

  const handleClickAway = () =>{
    setClickAway(false);
  }

  const getUpdatedDimensions = () => {
    let size =window.innerWidth;
    console.log(size);
    setWidth(size);
    console.log(width);
  }

  useEffect(()=>{
    
    window.addEventListener("resize",getUpdatedDimensions);      
    
    getUpdatedDimensions();

    // return () => window.removeEventListener("resize", getUpdatedDimensions);

  },[])
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      { clickaway ? <Paper component="form" className={classes.root} style={{backgroundColor:'white'}}>{displaySearch}</Paper>
                  : <div className={classes.root} style={{backgroundColor:'#f1f3f4'}}>{displaySearch}</div> }
    </ClickAwayListener>
  );
}