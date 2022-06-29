import React , {useState,useEffect} from "react";
import { InputNewColumn } from "./inputNewColumn";
var XLSX = require('xlsx');

export const InputForm = () => {
    const [data , setData] = useState([]);
    
    const handleInput = async (e) => {
        const file = e.target.files[0];
        const data = await file.arrayBuffer();
        const workbook = XLSX.read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        setData(jsonData);
        console.log(jsonData);
    }

    const handleFirstName = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    FirstName : event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }
    const handleLastName = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    LastName : event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }
    const handleGender = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    Gender : event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }
    const handleCountry = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    Country: event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }
    const handleAge = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    Age : event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }
    const handleDate = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    Date : event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }
    const handleId = (event,key) => {
        console.log("hello",event.target.value,key);
        setData([...data].map( obj => {
            if (obj === data[key]) {
                return {
                    ...obj,
                    Id : event.target.value
                }
            }
            else return obj;
        }))
        console.log(data[key].FirstName)
    }

    const handleParam = (event,key) => {
        console.log("hello" , event.target.value , key);
        setData([...data].map( obj => {
            if(obj === data[key]) {
                return {
                    ...obj,
                    Id : event.target.value
                }
            } 
            else return obj;
        }))
    }
    
    const exportData = () => {
        var wb = XLSX.utils.book_new();
        var ws = XLSX.utils.json_to_sheet(data);
    
        XLSX.utils.book_append_sheet(wb,ws,"sheet1");
        XLSX.writeFile(wb,"newexport.xlsx");
    }

    const showPresentData = () => {
        console.log(data)
        
    }

    return(
        <div>
            <table id="theader">

            <tr>
                <th>index</th>
                <th>first name</th>
                <th>last name</th>
                <th>gender</th>
                <th>country</th>
                <th>age</th>
                <th>date</th>
                <th>id no.</th>
            </tr>
            </table>
        {data.map((item,i) => (
            <table>
<tbody>

            <tr key={i}>
                <td>{item.index}</td>
                <td><input type="text " onChange={(event) => handleFirstName(event,i)} placeholder={item.FirstName}></input></td>
                <td><input type="text" onChange={(event) => handleLastName(event,i)} placeholder ={item.LastName}></input></td>
                <td><input type="text" onChange={(event) => handleGender(event,i)} placeholder={item.Gender}></input></td>
                <td><input type= "text" onChange={(event) => handleCountry(event,i)} placeholder={item.Country} /></td>
                <td><input type="text" onChange={(event) => handleAge(event,i)} placeholder={item.Age} /></td>
                <td><input type="text" onChange={(event) => handleDate(event,i)} placeholder={item.Date} /></td>
                <td><input type="text" onChange={(event) => handleId(event,i)} placeholder={item.Id} /></td>
            </tr>
</tbody>
            </table>
                        ))}

            <input type="file" onChange={handleInput} ></input>
            <button onClick={showPresentData}>json</button>
            <button onClick={exportData}>export as xlsx</button>
        </div>
    )
}