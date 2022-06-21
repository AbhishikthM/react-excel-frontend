import React , {useState, useEffect} from 'react';

var XLSX  = require("xlsx");

export const Table = () => {
    const [data,setData] = useState([]);
    const [params,setParams] = useState([]);    
    

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
                        return <td><input id={i} type="text" onClick={(e) => handleChange(e,rowData,v)} placeholder={rowData[v]}></input></td>
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
                    <thead>
                        <tr>
                        {params.map((item,i) => (
                            <th key={i}>{item} <button onClick={() => deleteParam(item)}>-</button></th>
                            ))}
                            <th><button id="add" onClick={promptParam}>+</button></th>
                        </tr>
                   </thead>
                    <tbody>
                        {tdData()}
                    </tbody>
                
            </table>
            </div>
            <div>
                <input type="file" onChange={handleInput}/>
                <button onClick={updateParams}>update params</button>
                <button onClick={exportData}>export data</button>
            </div>
        </div>
    )
}