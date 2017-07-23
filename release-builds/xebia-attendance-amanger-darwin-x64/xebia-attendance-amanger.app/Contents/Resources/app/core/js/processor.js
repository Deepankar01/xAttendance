const moment = require("moment");
const {extractADay} = require("./dayProcessor");
/**
 * Callee of the function
 * @param {string} regularizedDataJSON 
 * @param {string} leaveRequestDataJSON 
 * @param {string} biometricDataJSON 
 */
const processExcels = (regularizedDataJSON, leaveRequestDataJSON, biometricDataJSON) => {
    //process employee by employee 
    var data = [];
    for(let i=0;i< biometricDataJSON.length;i+=1){
       data.push(new extractADay()
        .getEmployee(biometricDataJSON[i])
        .adjustSaturdayAsWeekOf()
        .extractAbsents()
        .extractRegularizedData(regularizedDataJSON)
        .fillReguluraizedData()
        .extractLeaveRequestData(leaveRequestDataJSON)
        .fillLeaveRequestData()
        .fillErrors()
        .finalizeDay());
    }
    return data;
}

module.exports = {
    processor: processExcels,
}