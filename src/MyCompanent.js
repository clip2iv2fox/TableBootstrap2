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

let input_ref = document.createElement('input');

const items = obj_local;
let filteredItems = {...items};
let filteredStr = {...filteredItems};

const handleClick = (str) => {
    input_ref.value = "";
    const filtered = items.Data.filter( (el) => {
        if(el.flag === str)
            return true
        else 
            return false;
    })
    filteredStr = { ...items, Data: filtered };
    filteredItems = {...filteredStr};
}

const findundstr = (str) => {
    const regex = new RegExp(str,'i');
    const temp = filteredStr.Data.filter( (el) => {
        const index = el.Message.search(regex);
        if( index !== -1)
            return true;
        else
            return false;
    })
    filteredItems = {...filteredStr, Data: temp};
}

const handleClickAll = () => {
    input_ref.value = "";
    filteredItems = {...items};
    filteredStr = {...filteredItems};
}

const DrawTable2 = (props) => {
    return(
        <div class="container-fluid m-0">
            <div class="row" style="padding-bottom: 12px">
                <div class="col-12 text-start" style="padding-left: 0; padding-right: 8px">
                    <span style="font-size: 24px">System Event Log</span>
                </div>
            </div>
            <div class="row" style="padding-bottom: 12px">
                <div class="col-auto" style="padding-left: 0; padding-right: 8px">
                    <div class="dropdown">
                        <button class="btn btn-secondary rounded-0 dropdown-toggle" type="button" id="dropdown-basic" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Min Severity
                        </button>
                        <div class="dropdown-menu" aria-labelledby="dropdown-basic">
                            <a class="dropdown-item" href="#" onclick="props.Click('info')">info</a>
                            <a class="dropdown-item" href="#" onclick="props.Click('warning')">warning</a>
                            <a class="dropdown-item" href="#" onclick="props.Click('critical')">critical</a>
                            <a class="dropdown-item" href="#" onclick="props.ClickAll()">all</a>
                        </div>
                    </div>
                </div>
                <div class="col" style="padding-bottom: 8px; padding-right: 0">
                    <input type="text" onchange="(e) => props.findundstr(e.target.value)" class="form-control rounded-0" placeholder="Поиск"/>
                </div>
            </div>
            <div class="row">
                <table class="table">
                    <thead>
                        <th class="w-auto" style="white-space: nowrap">Date</th>
                        <th class="w-100" style="padding-left: 8px">Message</th>
                    </thead>
                    <tbody>
                        ${props.Data.map( (el) => {
                            return(
                                `<tr>
                                    <td style="white-space: nowrap; background-color: ${color_num[el.flag].color}">
                                        ${el.Date}
                                    </td>
                                    <td style="background-color: ${color_num[el.flag].color}">
                                        ${el.Message}
                                    </td>
                                </tr>`
                            );
                        }).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const ContainerDrawTable2 = () => {
    return DrawTable2({ Data: filteredItems.Data, Click: handleClick, ClickAll: handleClickAll, findundstr: findundstr });
}

document.getElementById('root').appendChild(ContainerDrawTable2());


export default ContainerDrawTable2;