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
import { useNavigate } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const isAdmin = usuarioLogado?.isAdmin || false;
  const isAuthenticated = Boolean(usuarioLogado);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogout = () => {
    localStorage.removeItem('usuarioLogado');
    navigate('/login');
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

          {isAuthenticated && (
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleNavigate('/perfil')}>Perfil</MenuItem>
              {isAdmin && (
                <>
                  <MenuItem onClick={() => handleNavigate('/dados-financeiros')}>Dados Financeiros</MenuItem>
                  <MenuItem onClick={() => handleNavigate('/cadastrar-funcionario')}>Cadastrar Funcionário</MenuItem>
                </>
              )}
            </Menu>
          )}

          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer', flexGrow: 1, color: '#333' }}
            onClick={() => {
              if (isAuthenticated) {
                navigate('/home');
              }
            }}
          >
            Hohmann
          </Typography>

          {isAuthenticated ? (
            <Button sx={{ color: '#333' }} onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button sx={{ color: '#333' }} onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;