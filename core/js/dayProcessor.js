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
    this.adjustSaturdayAsWeekOf = () => {
        //extract all saturdays of the month
         let firstDay = moment(Object.keys(this.employeeDetails)[3], "DD-MMM").set("year", moment().get("year"));
         for (let i = 0; i < firstDay.daysInMonth(); i++) {
            if(moment(firstDay).add(i, "days").format("dd") === "Sa"){
                if(this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] === "A") 
                    this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] = "WO";
                    this.employeeDetails["WO"] = parseInt(this.employeeDetails["WO"],10)+1;
            }
         }
        return this;
    }
    this.extractAbsents = () => {
            this.absentDates = [];
            let firstDay = moment(Object.keys(this.employeeDetails)[3], "DD-MMM").set("year", moment().get("year"));
            for (let i = 0; i < firstDay.daysInMonth(); i++) {
                if(this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] === "A") 
                    this.absentDates.push(moment(firstDay).add(i, "days").format("DD-MMM"));
            }
            return this;
    },
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
                        //delete a particular date for which it was regularized
                        delete this.absentDates[this.absentDates.indexOf(moment(from).add(i, "days").format("DD-MMM"))];
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
        if (!_.isEmpty(this.leaveRequestData)) {
            this.leaveRequestData.forEach((leaveRequest) => {
                let from = moment(leaveRequest.from, "DD-MMM-YY");
                let to = moment(leaveRequest.to, "DD-MMM-YY");
                for (let i = 0; i <= to.diff(from, "days"); i += 1) {
                    this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = selectLeaveRequestReason(leaveRequest.category);
                    delete this.absentDates[this.absentDates.indexOf(moment(from).add(i, "days").format("DD-MMM"))];
                    this.employeeDetails.A = parseInt(this.employeeDetails.A, 10) + 1;
                }
            });
        }
        return this;
    },
    this.fillErrors = () => {
            this.absentDates.forEach((absent)=>{
                this.employeeDetails[absent] = "ERROR";
            })
            return this;
    },    
    this.finalizeDay = () => {
            console.log(this.employeeDetails)
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
 * @param {*} category 
 */
const selectRegularizedReason = (category) => {
    let status = "";
    switch (category) {
        case "Work From Home":
            status = "WFH";
            break;
        case "Could not Login":
            status = "LOGIN";
            break;
        case "Early depart Compensation":
            status = "EARLYDEP";
            break;
        case "Late coming Regularization":
            status = "LATE";
            break;
        case "Late Compensation":
            status = "LATECOM";
            break;
        case "Travel on Duty":
            status = "TRAVEL";
            break;            
        case "Had forgotten to Login":
            status = "FORGOTLOGIN";
            break;
        case "Will be on Training":
        case "Was on Training":
            status = "TRAINING";
            break;           
        case "Will be on Duty/Official Tour": 
        case "Was on Duty/Official Tour":
            status = "ONSITE";
            break;  
        default:
            status = "ERROR";
    }
    return status;
}

/**
 * TODO add all the categories from adrenaline
 * @param {*} category 
 */
const selectLeaveRequestReason = (category) => {
    let status = "";
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