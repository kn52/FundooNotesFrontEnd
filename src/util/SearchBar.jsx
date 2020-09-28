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
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

export default function SearchBar() {
  const classes = useStyles();
  const [clickaway,setClickAway]=useState(false);
  const [searchText,setSearchText]=useState('');
  const [onck,setOnck]=useState(false);
  
  const dispatch = useDispatch();

  const sethandleSearch = () => {
     if(onck === false){
        setOnck(true);
        setClickAway(true)
     }
  }

  const getSearchedNotes = (data) => {
    dispatch(searchNotes(data))
    dispatch(callToApi("NOTES")) 
  }

  const displaySearch = (
    <>
      <IconButton aria-label="menu">
          <SearchIcon id = "searchicon" className= {onck === false && 'search_icon'} 
            onClick={ ()=> sethandleSearch()}/>
        </IconButton>
        <InputBase
          className={classes.input}
          placeholder="Search"
          value={searchText}
          inputProps={{ 'aria-label': 'search notes' }}
          onChange={ (e) => {
            setSearchText(e.target.value)
            getSearchedNotes(e.target.value)
          }}
          onClick={()=>setClickAway(true)}
        />
        <IconButton  className="icon_button" aria-label="directions">
          {
            clickaway && <CrossIcon onClick={ () => {
              setSearchText('')
              getSearchedNotes('')
            } }/> 
          }
        </IconButton>
    </>
  )

  const handleClickAway = () =>{
    setClickAway(false);
    setSearchText('')
    getSearchedNotes('')
    if(window.innerWidth < 768 && onck === true){
      setOnck(false);
    }
  }

  useEffect(() => {
    function handleResize() {
      let wdth=window.innerWidth; 
      if(wdth<600 && onck === false){
        setClickAway(false);
      }
      if(wdth>600){
        setClickAway(false);
      }
    }
    
    window.addEventListener("resize", handleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, [onck]);
  
  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      { clickaway ? <Paper id="paper_con" component="form" className=
                {(window.innerWidth < 600 && onck === false) ? "root_search responsive_search"
                :(window.innerWidth < 600 && onck === true) ? "root_search searchBar"
                : "root_search search"}  
                style={{backgroundColor:'white'}}>{displaySearch}</Paper>
                : <div id="div_con" component="form" className=
                {(window.innerWidth < 600 && onck === false) ? "root_search responsive_search"
                :(window.innerWidth < 600 && onck === true) ? "root_search searchBar"
                : "root_search search"} 
                style={{backgroundColor:'#f1f3f4'}}>{displaySearch}</div> }
    </ClickAwayListener>
  );
}