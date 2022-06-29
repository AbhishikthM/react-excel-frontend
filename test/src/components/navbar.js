import  React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


export const Navbar = () => {
    return(
        <Box sx={{ justifyContent: 'space-evenly' }}>
        <Button variant='outlined'><Link to="/grid">grade center</Link></Button>
            <Button variant='outlined' ><Link to="/options" >options</Link></Button>
        </Box>
    )
}

