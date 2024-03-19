
let EmpData = {
    Empdata :[{id:103,name:"gayathri"}]
}

const EmployeeReducer = (state = EmpData ,action) =>{
    switch(action.type){
        case "setEmpData":
            return {
                ...state,
                Empdata :action.payload
            }
     
        default:
            return state;
    }

}

export default EmployeeReducer;