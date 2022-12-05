import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
const options = [
  '', 
  'Name (A-Z)', 
  'Publish Date (Newest)',
  'Listens (High-Low)',
  'Likes (High-Low)',
  'Dislikes (High-Low)',
];



export default function SimpleListMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { store } = useContext(GlobalStoreContext);

  const handleSortByName_menu = () => {
    //store.handleSortByName();
    console.log("in handle sort by name");
    setAnchorEl(null);
    store.sortByName();
  }

  const handleSortByDate_menu = () => {
    //store.handleSortByName();
    console.log("in handle sort by name");
    setAnchorEl(null);
    store.sortByDate();
  }

  const handleSortByListens_menu = () => {
    //store.handleSortByName();
    console.log("in handle sort by name");
    setAnchorEl(null);
    store.sortByListens();
  }

  const handleSortByLikes_menu = () => {
    //store.handleSortByName();
    console.log("in handle sort by name");
    setAnchorEl(null);
    let tempList= store.sortByLikes();
    console.log("tempListSortByLikes: ",tempList);

  }

  const handleSortByDislikes_menu = () => {
    //store.handleSortByName();
    console.log("in handle sort by name");
    setAnchorEl(null);
    store.sortByDislikes();
  }

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    console.log("selectedIndex: ", index);
    console.log("sort by case",options[index]);
    switch(index) {
      case 1:
        // 'Name (A-Z)', 
        console.log("entered name a-z case");
        handleSortByName_menu();
        
        break;
      case 2:
        // Publish Date (Newest)
        handleSortByDate_menu();
        break;
      case 3:
        // Listens (High-Low)
        handleSortByListens_menu();
        break;
      case 4:
        // Likes (High-Low)
        handleSortByLikes_menu();
        break;
      case 5:
        // Dislikes (High-Low)
        handleSortByDislikes_menu();
        break;
      default:
        // code block
    }

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: 'silver' }}
      >
        <ListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="Sort By:"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
            
          <ListItemText
            primary= "Sort By: "
            secondary={options[selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
