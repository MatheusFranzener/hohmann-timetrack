import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Função para abrir o menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#A3E7A9' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2, color: '#333' }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Dados Financeiros</MenuItem>
            <MenuItem onClick={handleMenuClose}>Cadastrar Funcionário</MenuItem>
          </Menu>
          
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: '#333' }}>
            Hohmann
          </Typography>
          <Button sx={{ color: '#333' }}>Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
