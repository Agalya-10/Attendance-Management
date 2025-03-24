import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText, createTheme, ThemeProvider, keyframes } from '@mui/material';
import { MenuList } from '../Shared/Constant';

const theme = createTheme({
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          '&.active': {
            background: 'linear-gradient(to left,rgb(20, 7, 78) 0%, #3f51b5 100%)',
            backgroundSize: '200% 100%',
            backgroundPosition: 'right',
            color: '#fff',
            transition: '1s ease-in-out',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
            }
          },
        },
      },
    },
  },
});
const Menus = () => {
  return (
    <ThemeProvider theme={theme} sx={{ display: 'flex' }}>
      <List style={{ width: '200px' }}>
        {MenuList.map(item => <ListItem button component={NavLink} to={item.navLink} activeClassName="Mui-selected" exact key={item.title}><ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.title} /></ListItem>)}
      </List>
    </ThemeProvider>
  );
};

export default Menus;
