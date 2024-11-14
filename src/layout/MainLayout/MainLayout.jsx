import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Outlet, useNavigate} from "react-router-dom";
import Header from "./Header.jsx";
import Drawer, {DrawerHeader} from "./Drawer.jsx";
import NavList from "../../Components/layout/NavList.jsx";
import {useState} from "react";
export default function MainLayout() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleClick = (data)=>{
        navigate(data)
    }


    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <Header position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Infinite Learning Attendance System
                    </Typography>
                </Toolbar>
            </Header>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    {/*TODO LOGO OVER HERE*/}
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                {/*NAVLIST HERE*/}
                <NavList handleClick={handleClick}/>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3}}>
                <DrawerHeader />
                {/* OUTLET HERE */}
                <Outlet/>
            </Box>
        </Box>
    );
}