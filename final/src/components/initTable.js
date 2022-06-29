import React , {useState}  from "react";

export const InitTable = () => {
    const  inputParams = [
        {
            type : "text",
            id : 0,
            value : ""
        }
    ]
    const [count , setCount] = useState(0);
    const [params , setParams] = useState(inputParams);

    const addParams = () => {
        setParams(s => {
          return [
            ...s,
            {
              type: "text",
              value: ""
            }
          ];
        });
      };   


    const handleChange = (e) => {
        e.preventDefault();

        const index = e.target.id;
        setParams(s => {
            const newParam = s.slice();
            newParam[index].value = e.target.value;
            return newParam;
        })

    }

    const handleSubmit = () => {

    }

    return(
        <div>
            <h1>please enter the layout of columns</h1>
            {params.map((item,i) => {
                return(
                    <input 
                    onChange={handleChange}
                    value={item.value}
                    id={i}
                    type={item.type}
                    ></input>
                )
            })}
            <button onClick={addParams}>add column</button>
            <div>
            <button onClick={() => console.log(params)}>show params</button>
            </div>
        </div>
        )
}