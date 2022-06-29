import React from "react";
import Box from '@mui/material/Box';

export const Options = (props) => {

    const obj = {
        firstName : "aparna",
        lastName : "dana kishore"
    }
    return(
        <Box>
            <h1>this is {obj.lastName}</h1>
        </Box>
    )
}