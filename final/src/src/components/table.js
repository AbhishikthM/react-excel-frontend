import React, { useState } from "react";
import './table.css';
import Typography  from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { green } from "@mui/material/colors";




var XLSX = require('xlsx');

export const ChangingTable = () => {

    const [data,setData] = useState([]);
    const [params,setParams] = useState([]);    

    const styles = theme => ({
        TextField: {
            width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',            
        paddingBottom: 0,
        marginTop: 0,
        fontWeight: 500
    },
    input: {
        color: 'white'
    }
    });
    

    const handleInput = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
    }    
    
    const updateParams = () => {
        setParams(Object.keys(data[1]))
    }
    

    const tdData = () => {
        return data.map((rowData,i) => {
            return(
                <tr>
                    {params.map((v,j) => {
                        return <td>
                            <TextField className="TextInput" variant="outlined"  id={i} onChange={(e) => handleChange(e,rowData,v)} label={rowData[v]} ></TextField>
                            </td>
                    })}
                </tr>
            )
        })
    }
    
    const handleChange = (e,rowData,v) => {
        
        const rowInd = e.target.id;
        const colInd = v;
        
        setData(s => {
            const newData = s.slice();
            newData[rowInd][colInd] = e.target.value;
            return newData;
        })
        
        console.log(rowInd);
        console.log(rowData);
        console.log(colInd);
        console.log(data[rowInd][colInd]);
    }
    
    
    const exportData = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(data);
        
        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        XLSX.writeFile(wb,"export.xlsx");
    }

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

    const deleteParam = (testParam) => {

        const newData = data;
        for (let i = 0; i < newData.length ; i++) {
            let item = newData[i];
            delete item[testParam];
        }

        setData(newData);
        updateParams();

    }



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
                <table className="excelTable">
                    
                        <tr>
                        {params.map((item,i) => (
                            <th key={i}>
                                <Typography variant="overline" >
                                    {item} 
                                </Typography> 
                            </th>
                            ))}
                        </tr>
                        {params.map((item,i) => (
                            <th key={i}>
                                <Typography variant="overline" >
                                    <Button variant="outlined" size="large" color="error" onClick={() => deleteParam(item)}><DeleteIcon /></Button>
                                </Typography> 
                            </th>
                            ))}
                            <th><Button variant="outlined" size="large" color="success" id="add" onClick={promptParam}><AddIcon /></Button></th>
                        <tr>

                        </tr>
                    <tbody>
                        {tdData()}
                    </tbody>
                
            </table>
            </div>
            <div>
                <input type="file" onChange={handleInput}/>
                <button onClick={() => console.log(params)} >show params</button>
                <button onClick={updateParams}>update params</button>
                <button onClick={console.log(data)} >show data</button>
                <button onClick={exportData}>export data</button>
            </div>
        </div>
    )
}