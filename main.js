const XLSX = require("xlsx");
const moment = require("moment");

const regularizationXLSX = XLSX.readFile('./data/AR Request.xlsx');

const regulariedData = XLSX.utils.sheet_to_json(regularizationXLSX.Sheets[regularizationXLSX.SheetNames[0]], { header: ["id", "name", "from", "to", "category", "reason", "status", "initiated", "updated", "updatedBy"] });

const leaveRequestXLSX = XLSX.readFile('./data/Leave Request.xlsx');
const leaveRequestData = XLSX.utils.sheet_to_json(leaveRequestXLSX.Sheets[leaveRequestXLSX.SheetNames[0]], { header: ["id", "name", "from", "to", "category", "days", "reason", "transactionType", "status", "initiated", "updated", "updatedBy", "month"] });

const biometricXLSX = XLSX.readFile('./data/Biometric Sheet.xlsx');
const extractedFirstDay = XLSX.utils.sheet_to_json(biometricXLSX.Sheets[biometricXLSX.SheetNames[0]], { header: ["sno", "id", "name", "firstday"] })[0].firstday;
const firstDay = moment(extractedFirstDay, "DD-MMM").year(moment().year());
const calculationMonth = firstDay.format("MMM");
let biometricHeaders = ["sno", "id", "name"];
for (let i = 0; i < firstDay.daysInMonth(); i+=1) {
 biometricHeaders.push(parseInt(moment(firstDay).add(i,"days").format("DD"),10))
}
biometricHeaders.push("P","A","L","H","HP","WO","WOP")
const biometricData = XLSX.utils.sheet_to_json(biometricXLSX.Sheets[biometricXLSX.SheetNames[0]], { header: biometricHeaders});
console.log(biometricData);