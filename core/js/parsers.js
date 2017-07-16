const XLSX = require("xlsx");
const moment = require("moment");

/**
 * Function to parse the Regularized Attendance
 * @param {String} fileName 
 */
const parseAndGetRegularizedData = (fileName) => {
    let regularizationXLSX = XLSX.readFile(fileName);
    let regulariedData = XLSX.utils.sheet_to_json(regularizationXLSX.Sheets[regularizationXLSX.SheetNames[0]], { header: ["id", "name", "from", "to", "category", "reason", "status", "initiated", "updated", "updatedBy"] });
    return regulariedData;
};


/**
 * Function to parse the leaveRequest
 * @param {String} fileName 
 */
const parseAndGetleaveRequestData = (fileName) => {
    let leaveRequestXLSX = XLSX.readFile(fileName);
    let leaveRequestData = XLSX.utils.sheet_to_json(leaveRequestXLSX.Sheets[leaveRequestXLSX.SheetNames[0]], { header: ["id", "name", "from", "to", "category", "days", "reason", "transactionType", "status", "initiated", "updated", "updatedBy", "month"] });
    return leaveRequestData;
};


/**
 * Function to parse the Biometric Attendance
 * @param {String} fileName 
 */
const parseAndGetBiometricData = (fileName) => {
    let biometricXLSX = XLSX.readFile(fileName);
    let extractedFirstDay = XLSX.utils.sheet_to_json(biometricXLSX.Sheets[biometricXLSX.SheetNames[0]], { header: ["sno", "id", "name", "firstday"] })[0].firstday;
    let firstDay = moment(extractedFirstDay, "DD-MMM").year(moment().year());
    let calculationMonth = firstDay.format("MMM");
    let biometricHeaders = ["sno", "id", "name"];
    for (let i = 0; i < firstDay.daysInMonth(); i += 1) {
        biometricHeaders.push(moment(firstDay).add(i, "days").format("DD") + "-" + calculationMonth);
    }
    biometricHeaders.push("P", "A", "L", "H", "HP", "WO", "WOP");
    let biometricData = XLSX.utils.sheet_to_json(biometricXLSX.Sheets[biometricXLSX.SheetNames[0]], { header: biometricHeaders });
    return biometricData;
}

module.exports = {
    regularized : parseAndGetRegularizedData,
    leaveRequest: parseAndGetleaveRequestData,
    biometricData: parseAndGetBiometricData
}