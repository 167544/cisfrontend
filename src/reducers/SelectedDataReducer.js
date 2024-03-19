
let EmpData = {
    Empdata :[{id:103,name:"priya"}]
}

const SelectedDataReducer = (state = EmpData ,action) =>{
    switch(action.type){
        case "setSelecteddata":
            return {
               
                Empdata :action.payload
            }
     
        default:
            return state;
    }

}

export default SelectedDataReducer;