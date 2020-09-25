import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../scss/SearchBar.scss';
import { InputBase, Paper, ClickAwayListener, IconButton } from '@material-ui/core/';
import SearchIcon from '@material-ui/icons/Search';
import CrossIcon from '@material-ui/icons/Clear'
import { useDispatch } from 'react-redux';
import { searchNotes } from '../redux/actions/NoteAction';
import { callToApi } from '../redux/actions/ApiAction';

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
  const [onck,setOnck]=useState(false);
  const [width,setWidth]=useState(false);
  const dispatch = useDispatch();

  const sethandleSearch = () => {
     if(onck === false){
       setOnck(true);
     }
     if(onck === true){
      setOnck(false);
    }
  }

  const displaySearch = (
    <>
      <IconButton className="icon_button" aria-label="menu">
          <SearchIcon id = "searchicon" className= {(width < 768 && onck === false) && 'search_icon'} 
            onClick={ ()=>width < 768 && sethandleSearch()}/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={searchText}
          inputProps={{ 'aria-label': 'search notes' }}
          onChange={ (e) => {
            setSearchText(e.target.value)
            dispatch(searchNotes(e.target.value))
            dispatch(callToApi("NOTES"))
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
      setWidth(width);
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      { clickaway ? <Paper id="paper_con" component="form" 
                className={
                  onck === false ? window.innerWidth>=700 ? "root_search search" : "root_search responsive_search"
                  :(onck === true && window.innerWidth>=700) ? "root_search search" :  "root_search responsive_search"   
                }
                style={{backgroundColor:'white'}}>{displaySearch}</Paper>
                : <div id="div_con" 
                className=
                {onck === false ? window.innerWidth>=700 ? "root_search search" : "root_search responsive_search"
                :(onck === true && window.innerWidth>=700) ? "root_search search" :  "root_search responsive_search"    
                } 
                style={{backgroundColor:'#f1f3f4'}}>{displaySearch}</div> }
    </ClickAwayListener>
  );
}