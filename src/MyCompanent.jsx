import { Dropdown } from "react-bootstrap";
import React, { useEffect, useReducer, useState, useRef } from 'react';

const DROPDOWN_INFO = "DROPDOWN_INFO";
const DROPDOWN_WARNING = "DROPDOWN_WARNING";
const DROPDOWN_CRITICAL = "DROPDOWN_CRITICAL";

let obj_local = {
    Data :[
        {
            Date : "2022-11-15 19:26:33",
            Message: "The power input for power ssupply 1 is lost",
            flag : "critical"
        },
        {
            Date : "2022-11-15 19:26:29",
            Message : "Power supply redundancy is lost",
            flag : "critical"
        },
        {
            Date : "2022-10-26 18:26:29",
            Message : "The power input for power ssupply 2 is lost",
            flag : "critical"
        },
        {
            Date : "2022-10-23 11:46:33",
            Message : "The power supplies are redundant",
            flag : "info"
        },
        {
            Date : "2022-10-23 11:46:29",
            Message : "The inpurt power for power supply 2 has been restored",
            flag : "info"
        },
        {
            Date : "2020-10-23 13:46:29",
            Message : "Log was cleared",
            flag : "warning"
        },

    ]
}

let color_num = {
    critical: {
        color : 'rgba(231, 92, 92, 0.46)',
        num : 0
    },
    info : {
        color : 'rgb(255, 255, 255)',
        num : 2
    },
    warning : {
        color : 'rgba(233, 230, 77, 0.466)',
        num : 1
    }
}



const ContainerDrawTable2 = () =>{

    // let local_obj_func = obj_local;
    // const [stateLocale, dispatchLocale] = useReducer(reducer,obj_local);
    let input_ref = useRef(null);

    const [items,setItems] = useState(obj_local);

    const [filteredItems, setfilteredItems] = useState(items)

    const[filteredStr, setfilteredStr] = useState(filteredItems)

    const handleClick = (str) =>{
        debugger;
        input_ref.current.value = "";
        console.log(input_ref.current)
        const filtered = items.Data.filter( (el) => {
            if(el.flag === str)
                return true
            else 
                return false;
        })
        const obj_filtered = {...items, Data : filtered}
        setfilteredStr(obj_filtered)
        setfilteredItems(obj_filtered);
    }

    const findundstr = (str) =>{
        debugger;
        const regex = new RegExp(str,'i');
        const temp = filteredStr.Data.filter( (el) => {
            const index = el.Message.search(regex);
            if( index !== -1)
                return true;
            else
                return false;
        })
        const obj = {...filteredStr, Data : temp}
        setfilteredItems(obj);
    }

    const handleClickAll = () =>{
        input_ref.current.value = "";
        setfilteredItems(items);
        setfilteredStr(items)
    }


    return(
      <DrawTable2 Data = {filteredItems.Data} Click = {handleClick} ClickAll = {handleClickAll} findundstr = {findundstr} input_ref = {input_ref} />  
    );
}

const DrawTable2 = (props)=>{
    debugger;
    return(
        <div className="container-fluid m-0" >
            <div className="row" style={{paddingBottom: 12}}>
                <div className="col-12 text-start" style = {{paddingLeft: 0, paddingRight: 8}}>
                    <span style={{fontSize: 24}}>System Event Log</span>
                </div>
            </div>
            <div className="row" style={{paddingBottom: 12}}>
                <div className="col-auto" style={{paddingLeft:0,paddingRight:8}}>
                <Dropdown>
                        <Dropdown.Toggle variant="secondary rounded-0" id="dropdown-basic">
                            Min Severity
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                                <Dropdown.Item  onClick={ () => {props.Click("info")}}>info</Dropdown.Item>
                                <Dropdown.Item  onClick={ () => {props.Click("warning")}}>warning</Dropdown.Item>
                                <Dropdown.Item onClick={ () => {props.Click("critical")}}>critical</Dropdown.Item>
                                <Dropdown.Item onClick= { () => {props.ClickAll()}}>all</Dropdown.Item>
                        </Dropdown.Menu>
                </Dropdown>
                </div>
                <div className="col" style={{paddingBottom: 8, paddingRight:0}}>
                    <input ref = {props.input_ref} type="text" onChange={ (e) => {props.findundstr(e.target.value)}} className="form-control rounded-0"  placeholder="Поиск"/>
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <th className="w-auto" style={{whiteSpace : "nowrap"}}>Date</th>
                        <th className="w-100" style={{paddingLeft: 8}}>Message</th>
                    </thead>
                    <tbody>
                       {
                        props.Data.map( (el) => {
                            return(<tr>
                                <td style={{whiteSpace: 'nowrap', backgroundColor : color_num[el.flag].color}}>
                                    {el.Date}
                                </td>
                                <td style={{backgroundColor : color_num[el.flag].color}}>
                                    {el.Message}
                                </td>
                            </tr>
                            );
                        })
                       }
                    </tbody>
                </table>
            </div>
        </div>
      
    );
}

export default ContainerDrawTable2;