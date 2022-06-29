import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { rootShouldForwardProp } from "@mui/material/styles/styled";
import { Button, Select, Switch, Typography } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { renderMatches } from "react-router-dom";


export const Options = (props) => {

    const [paramsData,setParamsData] = useState(props.mainParams)

    useEffect(() => {

    })

    const TableHead = () => {
        return paramsData.map((item,i) => {
            <th key={i} >
                <Typography variant="overline" >{item}</Typography>
            </th>
        })
    }

    const handleEdit = (e,item,i) => {
            console.log(item)
            if (e.target.checked === false) {
                setParamsData(s => {
                    const newParamsData = s.slice();
                    newParamsData[i]['editable'] = false;
                    return newParamsData;
                })
                props.setMainParams(paramsData)
            } else if (e.target.checked === true) {
                console.log('its off')
                setParamsData(s => {
                    const newParamsData = s.slice();
                    newParamsData[i]['editable'] = true;
                    return newParamsData;
                })
                props.setMainParams(paramsData)
            }
    }


    const editSwitch = (item,editParam,i) => {
       
        return <td><Switch checked={editParam} onChange={(e) => handleEdit(e,item,i)}   /></td>
    }

    const addParam = (e) => {
        let tempObj = {paramName: '' , editable: true , delete: false}
        tempObj['paramName'] = e;
        let newParamsData = paramsData;
        newParamsData.push(tempObj);
        setParamsData(newParamsData);
        console.log(newParamsData);
    }

    const promptParam = (e) => {
        let tempParam = prompt('please enter the new parameter')

        if (tempParam === null) {
            return;
        } else {
            addParam(tempParam);
        }
    }

    const deleteParam = (item) => {
        let newParamsData = paramsData;
        for (let i = 0; i < newParamsData.length ; i++) {
            console.log(newParamsData[i])
            if (newParamsData === item) {
                delete newParamsData[i]
            }
        }
        console.log(newParamsData)
    }
    


    return(
        <Box>
            <Typography variant="h4" >Options</Typography>
            <Box sx={{
                border: 3 ,
                borderRadius: '8px',
                borderColor: "#b1cefc" ,
                width :"90vw" ,
                maxheight: "50 vh" 
            }} >
                <table>
                    <thead>
                        <tr>
                            <th>Parameter name</th>
                            <th>editable</th>
                            <th>Delete parameter</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paramsData.map((item,i) => (

                            <tr key={i}>
                                <td key="paramN">{item['paramName']}</td>
                                {editSwitch(item,item['editable'],i)}
                                <td><Button variant="outlined" sx={{backgroundColor:"#ff7066"}} size="small" color="error" onClick={() => deleteParam(item)}><DeleteIcon /></Button></td>
                            </tr>
                        )
                        )}
                        <tr><td>
                        <Button variant="outlined" size="large" color="success" onClick={promptParam} ><AddIcon />add parameter</Button>
                        </td>
                        <td>
                            <Select ></Select>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </Box>
            <button onClick={() => console.log(props.mainParams)}>show main params</button>
            <button onClick={() => console.log(paramsData[0]['editable'])}>test button</button>
            <Switch checked={true} />
        </Box>
    )
}