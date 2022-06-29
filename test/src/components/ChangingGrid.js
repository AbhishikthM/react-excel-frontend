import React, { useEffect, useState } from "react";
import Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import './table.css';
import { Box } from "@mui/system";

var XLSX = require('xlsx');

export const ChangingGrid = (props) => {

    const [data,setData] = useState([{Index : 1,"first name" : "" , "last name" : "","Student ID " : 1}]);
    const [params,setParams] = useState([]);   
    const [comments,setComments] = useState([]);

    useEffect(() => {
        updateParams();
    },[data])

    // handling input of a new .xlsx file , converting into json format and data
    const handleInput = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
    }    
    
    //updating the parameters , this function also updates the whole table
    const updateParams = () => {
        setParams(Object.keys(data[0]));
    }
    
    // initializing comments if needed 
    //by creating a new array of objects along with comments for each parameter
    const initComments = () => {

        const tempComments = [{}];
        for (let i = 0; i<params.length ; i++) {
            const newComment = {};
            newComment['paramName'] = params[i];
            newComment['comment'] = '';
            tempComments.push(newComment);
        }
    
        setComments(tempComments)
        console.log('Comments :' , comments);

    }

    //editing each comment for specified parameter 
    //on request
    const editComment = (e,i) => {
            if (window.confirm("comment : " + comments[i]['comment'] + "   edit?")) {
                let newComment = prompt("please enter new Comment: ")
                setComments(
                    s => {
                        const newData = s.slice();
                        newData[i]['comment'] = newComment;
                        return newData;
                    })
            } else {
                return;
            }
            console.log(comments)
    }
    
    //function for mapping each element to a textfield
    //each textfield is also connected to the handleChange() function 
    const tdData = () => {
        return data.map((rowData,i) => {
            return(
                <tr>
                    {params.map((v,j) => {
                        return <td >
                            <TextField 
                            variant="filled"  
                            sx ={{
                                backgroundColor:"#ebeced",
                                height: 50,
                                minWidth: 150,
                                color:"#4c25b8"
                            }}
                            id={i} 
                            onChange={(e) => handleChange(e,rowData,v)} 
                            label={rowData[v]} >
                            </TextField>
                            </td>
                    })}
                </tr>
            )
        })
    }

    //handling change of a specified textfield and its attribute 
    //of the specified object(the data point) 
    // the data is set again with the modified datapoint
    const handleChange = (e,rowData,v) => {
        
        const rowInd = e.target.id;
        const colInd = v;
        
        setData(s => {
            const newData = s.slice();
            newData[rowInd][colInd] = e.target.value;
            return newData;
        })

        console.log(rowData);
        console.log(data[rowInd][colInd]);
    }
    
    //handling export using sheetjs
    const exportData = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(data);
        
        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        XLSX.writeFile(wb,"export.xlsx");
    }

    //addition of a new parameter to the table
    const addingParam = (testParam) => {
        
        const newData = [];
        for (let i = 0 ; i < data.length ; i++) {
            let item = data[i];
            item[testParam] = '';
            newData.push(item)
        }
        setData(newData)
        console.log(data);
        updateParams();
    }

    //delete a specified parameter and all the data associated with it
    const deleteParam = (testParam) => {

        const newData = data;
        for (let i = 0; i < newData.length ; i++) {
            let item = newData[i];
            delete item[testParam];
        }
        setData(newData);
        updateParams();
    }

    // adds a new datapoint(row) to the table
    const addItem = () => {
        const newItem = {}
        for ( let i = 0 ; i < params.length ; i++) {
            newItem[params[i]] = '';
        }
        setData(s=> {
            return [...s,newItem]
        } );
        console.log(newItem);
    }

    //prompts if the user wants to add a parameter
    const promptParam = (e) => {
        let id = e.target.id
        let tempParam = null; 

        if (id === "add") {
            tempParam = prompt("please enter param to add :")
        } else if (id === "del") {
            tempParam = prompt("please enter param to delete :")
        }
        
        if (tempParam === null) {
            return ;
        } else if (id === "add") {
            addingParam(tempParam);
        } else if (id === "del") {
            deleteParam(tempParam);
        }
        console.log(data);
        updateParams();
        
    }    

    
    
    return(
        <div>

            <div>
                <Box >
                    <Typography variant="overline" >
                        <h1>Grade center</h1>
                        please enter the grades for the assignments , click on add column for adding a new assignment
                    </Typography>
                </Box>
                    <Box sx={{border: 3 ,
                        borderRadius: '8px',
                        borderColor: "#b1cefc" ,
                        width :"90vw" ,
                        maxheight: "50 vh" ,
                        overflow:"auto",
                        }} >
                <table >
                        <tr>
                        {params.map((item,i) => (
                            <th key={i} >
                                <Typography variant="overline" sx={{width:100}} >
                                    {item}<br></br><Button onClick={(e) => editComment(e,i)}>c</Button>
                                </Typography> 
                            </th>
                            ))}
                        </tr>
                        {params.map((item,i) => (
                            <th key={i}>
                                <Typography variant="overline" >
                                    <Button variant="outlined" sx={{backgroundColor:"#ff7066"}} size="small" color="error" onClick={() => deleteParam(item)}><DeleteIcon /></Button>
                                </Typography> 
                            </th>
                            ))}
                            <th><Button variant="outlined" size="large" color="success" id="add" onClick={promptParam}><AddIcon />add column</Button></th>
                        <tr>
                            {comments.map((item,i) => (
                                <th key={i}>
                                    <Typography variant="overline" >{item.comment}</Typography>
                                </th>
                            ))}
                        </tr>
                        
                    <tbody>
                        {tdData()}
                        <tr>
                            <td>
                        <Button variant="outlined" onClick={addItem}><AddIcon></AddIcon></Button>
                            </td>
                        </tr>
                    </tbody>
                
            </table>
                            </Box>
            </div>
            <Box sx={{alignItems: " center"}}>
                <Button ><input type="file" onChange={handleInput}/></Button>
                <Button variant="outlined" onClick={initComments}>initialize comments</Button>
                <Button variant="outlined" onClick={updateParams}>update params</Button>
                <Button variant="outlined" onClick={exportData}>export data</Button>
                <Button variant="outlined" onClick={props.setParamsData(params)} >update paramsData</Button>
                <Button variant="outlined" onClick={console.log(props.paramsData)} >show paramsData</Button>
                <Button variant="outlined" onClick={console.log(data)} >show data</Button>
            </Box>
        </div>
    )
}