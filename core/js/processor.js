const moment = require("moment");
const {extractADay} = require("./dayProcessor");
/**
 * Callee of the function
 * @param {*} regularizedDataJSON 
 * @param {*} leaveRequestDataJSON 
 * @param {*} biometricDataJSON 
 */
const processExcels = (regularizedDataJSON, leaveRequestDataJSON, biometricDataJSON) => {
    //get first date of the month
    // let firstDay = moment(Object.keys(biometricDataJSON[0])[3],"DD-MMM").set("year",moment().get("year"));
    for(let i=0;i< biometricDataJSON.length;i+=1){
        new extractADay()
        .getEmployee(biometricDataJSON[i])
        .extractRegularizedData(regularizedDataJSON)
        .fillReguluraizedData()
        .extractLeaveRequestData(leaveRequestDataJSON)
        .fillLeaveRequestData()
        .higlightErrors()
        .finalizeDay()
    }
    
    // for (let i = 0; i < firstDay.daysInMonth(); i += 1) {
    //     new extractADay()
    //     .getAllEmployeesDataForDay(biometricDataJSON, moment(firstDay))
    //     .fillReguluraizedData(regularizedDataJSON)
    //     .fillLeaveRequestData(leaveRequestDataJSON)
    //     .higlightErrors()
    //     .finalizeDay()    
    //     //call the writter after this too

    //     //increment the next day
    //     moment(firstDay).add(i,"days");
    // }
    
    
    
    return this;
}

module.exports = {
    processor: processExcels,
}