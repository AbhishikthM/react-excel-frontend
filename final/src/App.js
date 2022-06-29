import './App.css';
import { BrowserRouter as Router , Route  ,Routes} from 'react-router-dom';
import { InputForm } from './components/inputForm';
import axios from './axios.js'
import { InitTable } from './components/initTable';
import { Navbar } from './components/navbar';
import { ChangingTable } from './components/table';
import { ChangingGrid } from './components/ChangingGrid';
import { Options } from './components/options';
import { useState } from 'react';


function App() {

  const [mainData,setMainData] = useState([])

  const [mainParams,setMainParams] = useState([
    {paramName : "Index" , editable : true , delete: false},
    {paramName : "First Name" , editable : true , delete: false},
    {paramName : "Last Name" , editable : true , delete: false},
    {paramName : "Student ID" , editable : false , delete: false}
  ])


  return (
    <Router>
    <div className="App-header">
      <Navbar />
      <Routes>
        <Route exact path="/init" element = {<InitTable />} />
        <Route exact path="/excel" element= {<InputForm />} />
        <Route exact path="/options" element={<Options mainParams = {mainParams} setMainParams = {setMainParams}></Options>} />
        <Route exact path='/grid' element= {<ChangingGrid mainParams = {mainParams} setMainParams = {setMainParams} ></ChangingGrid>} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
