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

  const [paramsData , setParamsData] = useState([])
  const one = "hello";



  return (
    <Router>
    <div className="App-header">
      <Navbar />
      <Routes>
        <Route exact path="/init" element = {<InitTable />} />
        <Route exact path="/excel" element= {<InputForm />} />
        <Route exact path="/options" element= {<Options paramsData = {paramsData} setParamsData = {setParamsData} />} />
        <Route exact path='/grid' element= {<ChangingGrid paramsData = {paramsData} setParamsData = {setParamsData} />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
