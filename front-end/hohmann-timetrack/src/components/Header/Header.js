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
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate para navegação

function Header({ isAuthenticated }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate(); // Use navigate para redirecionar

  // Função para abrir o menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Função para fechar o menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Função para lidar com navegação
  const handleNavigate = (path) => {
    navigate(path);
    handleMenuClose();
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
              <MenuItem onClick={() => handleNavigate('/dados-financeiros')}>Dados Financeiros</MenuItem>
              <MenuItem onClick={() => handleNavigate('/cadastrar-funcionario')}>Cadastrar Funcionário</MenuItem>
            </Menu>
          )}

          <Typography variant="h6" component="div" sx={{ cursor: 'pointer', flexGrow: 1, color: '#333' }} onClick={() => {
            if (isAuthenticated) {
              navigate('/home');
            }
          }}>
            Hohmann
          </Typography>

          {isAuthenticated ? (
            <Button sx={{ color: '#333' }} onClick={() => navigate('/login')}>
              Logout
            </Button>
          ) : (
            <Button sx={{ color: '#333' }} onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default Header;
