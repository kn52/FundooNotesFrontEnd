import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../scss/SearchBar.scss';
import { InputBase, Paper, ClickAwayListener, IconButton } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import CrossIcon from '@material-ui/icons/Clear'
import { useDispatch } from 'react-redux';
import { searchNotes } from '../redux/actions/NoteAction';

const useStyles = makeStyles(theme => ({
    root: {
        position:'absolute',
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '50%',
        borderRadius: '8px',
        marginLeft: theme.spacing(28), 
        [theme.breakpoints.down(768)]:{
          width:0, 
          padding: '2px 0px',
        }
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
  const [searchText,setSearchText]=useState('');
  const dispatch = useDispatch();
  const displaySearch = (
    <>
      <IconButton className="icon_button" aria-label="menu">
          <SearchIcon id = "searchicon"/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={searchText}
          inputProps={{ 'aria-label': 'search notes' }}
          onChange={ (e) => {
            setSearchText(e.target.value)
            dispatch(searchNotes(e.target.value))
          }}
          onClick={()=>setClickAway(true)}
        />
        <IconButton  className="icon_button" aria-label="directions">
          { clickaway && <CrossIcon onClick={ () => {
            setSearchText('')
          }}
        /> }
        </IconButton>
    </>
  )

  const handleClickAway = () =>{
    setClickAway(false);
  }

  useEffect(() => {
    function handleResize() {
      let width=window.innerWidth;
      
      if(width<766){
        // document.getElementById('searchicon').style.marginLeft=(1000 - width) + 'px';
      }
    }
    
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      { clickaway ? <Paper component="form" className={classes.root} style={{backgroundColor:'white'}}>{displaySearch}</Paper>
                  : <div className={classes.root} style={{backgroundColor:'#f1f3f4'}}>{displaySearch}</div> }
    </ClickAwayListener>
  );
}