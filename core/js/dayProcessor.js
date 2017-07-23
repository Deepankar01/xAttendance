const moment = require("moment");
const _ = require("lodash");
/**
 * Functional Data of the function
 */
const extractADay = function () {
    this.getEmployee = (employeeBiometricData) => {
        this.employeeDetails = employeeBiometricData;
        return this;
    },
    this.extractAbsents = () => {
        return this;
    }
    this.extractRegularizedData = (regularizedDataJSON) => {
            //get all the regularization of the month for the employee
            this.regularizedData = _.without(_.map(regularizedDataJSON, (regularization) => this.employeeDetails.id === regularization.id ? regularization : null), null);
            return this;
    },
    this.fillReguluraizedData = () => {
            //change the status of the particular date with the status of the day as P
            if (!_.isEmpty(this.regularizedData)) {
                this.regularizedData.forEach((regularization) => {
                    let from = moment(regularization.from, "DD-MMM-YY");
                    let to = moment(regularization.to, "DD-MMM-YY");
                    for (let i = 0; i <= to.diff(from, "days"); i += 1) {
                        this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = selectRegularizedReason(regularization.category);
                        this.employeeDetails.P = parseInt(this.employeeDetails.P, 10) + 1;
                    }
                });
            };
            return this;
    },
    this.extractLeaveRequestData = (leaveRequestDataJSON) => {
            this.leaveRequestData = _.without(_.map(leaveRequestDataJSON, (leaveRequest) => this.employeeDetails.id === leaveRequest.id ? leaveRequest : null), null);
            return this;
    },
    this.fillLeaveRequestData = () => {
            if(!_.isEmpty(this.leaveRequestData)){
                this.leaveRequestData.forEach((leaveRequest)=>{
                    let from = moment(leaveRequest.from, "DD-MMM-YY");
                    let to = moment(leaveRequest.to, "DD-MMM-YY");
                    for (let i = 0; i <= to.diff(from, "days"); i += 1) {
                        this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = selectLeaveRequestReason(leaveRequest.category);
                        this.employeeDetails.A = parseInt(this.employeeDetails.A, 10) + 1;
                    }
                });
                 

            }
            return this;
    },
    this.higlightErrors = () => {
            console.log(this);
            return this;
    },
    this.finalizeDay = () => {
        return this;
    }

    if (this instanceof extractADay) {
        return this.extractADay;
    } else {
        return new extractADay();
    }
}

/**
 * Function to process the reasons and update short form
 * TODO add all the categories from adrenaline
 * @param {*} category 
 */
const selectRegularizedReason = (category) => {
    let status = "";
    switch (category) {
        case "Work From Home":
            status = "WFH";
            break;
        default:
            status = "ERROR";

    }
    return status;
}

const selectLeaveRequestReason = (category) =>{
    let status ="";
    switch (category) {
        case "CSLP-Casual/Sick Leave - Probationer":
            status = "CSLP";
            break;
        default:
            status = "ERROR";

    }
    return status;
}

module.exports = {
    extractADay: extractADay
}