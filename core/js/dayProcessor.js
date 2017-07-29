const moment = require("moment");
const _ = require("lodash");
/**
 * Functional Data of the function
 */
const extractADay = function () {
    this.getEmployee = (employeeBiometricData) => {
        this.employeeDetails = employeeBiometricData;
        return this;
    }
    this.adjustSaturdayAsWeekOf = () => {
        //extract all saturdays of the month
        let firstDay = moment(Object.keys(this.employeeDetails)[3], "DD-MMM").set("year", moment().get("year"));
        for (let i = 0; i < firstDay.daysInMonth(); i++) {
            if (moment(firstDay).add(i, "days").format("dd") === "Sa") {
                if (this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] === "A"){
                    this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] = "WO";
                    this.employeeDetails["WO"] = parseInt(this.employeeDetails["WO"], 10) + 1;
                    this.employeeDetails.A  = parseInt(this.employeeDetails.A, 10) - 1;
                }
                else if (this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] === "P"){
                    this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] = "P";
                    this.employeeDetails.WOP = parseInt(this.employeeDetails.WOP,10)+1;
                }
                    
            }
        }
        return this;
    }
    this.extractAbsents = () => {
        this.absentDates = [];
        let firstDay = moment(Object.keys(this.employeeDetails)[3], "DD-MMM").set("year", moment().get("year"));
        for (let i = 0; i < firstDay.daysInMonth(); i++) {
            if (this.employeeDetails[moment(firstDay).add(i, "days").format("DD-MMM")] === "A")
                this.absentDates.push(moment(firstDay).add(i, "days").format("DD-MMM"));
        }
        return this;
    }
    this.extractRegularizedData = (regularizedDataJSON) => {
        //get all the regularization of the month for the employee
        this.regularizedData = _.without(_.map(regularizedDataJSON, (regularization) => this.employeeDetails.id === regularization.id ? regularization : null), null);
        return this;
    }
    this.fillReguluraizedData = () => {
        //change the status of the particular date with the status of the day as P
        if (!_.isEmpty(this.regularizedData)) {
            this.regularizedData.forEach((regularization) => {
                let from = moment(regularization.from, "DD-MMM-YY");
                let to = moment(regularization.to, "DD-MMM-YY");
                for (let i = 0; i <= to.diff(from, "days"); i += 1) {
                    if (this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] === "A") {
                        this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = selectRegularizedReason(regularization.category);
                        //delete a particular date for which it was regularized
                        delete this.absentDates[this.absentDates.indexOf(moment(from).add(i, "days").format("DD-MMM"))];
                        this.employeeDetails.P = parseInt(this.employeeDetails.P, 10) + 1;
                        this.employeeDetails.A = parseInt(this.employeeDetails.A, 10) - 1;
                    }
                    else {
                        //taht means the employee regularized the attendance but was present on the particular day
                        // skiping this
                        if (this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] === "P") {
                            //this.employeeDetails.P = parseInt(this.employeeDetails.P, 10) - 1;
                        }
                        //this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = "ERROR";

                    }

                }
            });
        };
        return this;
    }
    this.extractLeaveRequestData = (leaveRequestDataJSON) => {
        this.leaveRequestData = _.without(_.map(leaveRequestDataJSON, (leaveRequest) => this.employeeDetails.id === leaveRequest.id ? leaveRequest : null), null);
        return this;
    }
    this.fillLeaveRequestData = () => {
        if (!_.isEmpty(this.leaveRequestData)) {
            this.leaveRequestData.forEach((leaveRequest) => {
                let from = moment(leaveRequest.from, "DD-MMM-YY");
                let to = moment(leaveRequest.to, "DD-MMM-YY");
                for (let i = 0; i <= to.diff(from, "days"); i += 1) {
                    if (this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] === "A") {
                        this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = selectLeaveRequestReason(leaveRequest.category);
                        delete this.absentDates[this.absentDates.indexOf(moment(from).add(i, "days").format("DD-MMM"))];
                        this.employeeDetails.A = parseInt(this.employeeDetails.A, 10) - 1;
                        this.employeeDetails.L = parseInt(this.employeeDetails.L, 10) + 1;
                    }
                    else {
                        //taht means the employee took the leave but was present on the particular day
                        // skiping this
                        if (this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] === "P") {
                            //this.employeeDetails.P = parseInt(this.employeeDetails.P, 10) - 1;
                        }
                        //this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = "ERROR"
                    }
                }
            });
        }
        return this;
    }
    this.fillErrors = () => {
        this.absentDates.forEach((absent) => {
            this.employeeDetails[absent] = "NOTAPPLIED";
        })
        return this;
    }
    this.finalizeDay = () => {
        return this.employeeDetails;
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
    switch (category.toLowerCase()) {
        case "work from home":
            status = "WFH";
            break;
        case "could not login":
            status = "LOGIN";
            break;
        case "early depart compensation":
            status = "EARLYDEP";
            break;
        case "late coming regularization":
            status = "LATE";
            break;
        case "late compensation":
            status = "LATECOM";
            break;
        case "travel on duty":
            status = "TRAVEL";
            break;
        case "had forgotten to login":
            status = "FORGOTLOGIN";
            break;
        case "will be on training":
        case "Was on Training":
            status = "TRAINING";
            break;
        case "will be on duty/official tour":
        case "was on duty/official tour":
            status = "ONSITE";
            break;
        default:
            status = "REGULARIZEDMESSEDUP";
    }
    return status;
}

/**
 * TODO add all the categories from adrenaline
 * @param {*} category 
 */
const selectLeaveRequestReason = (category) => {
    let status = "";
    switch (category.toLowerCase()) {
        case "cslp-casual/sick leave - probationer":
            status = "CSLP";
            break;
        case "el-earned leaves":
            status = "EL";
            break;
        case "csl-casual/sick leave":
            status = "CSL"
            break;
        case "elp-earned leaves - probationer":
            status = "ELP";
            break;
        case "ol-optional leave":
            status = "OL";
            break;
        case "com-comp off":
            status = "COMPOFF";
            break; 
        case "bl-birthday / marriage anniversary leave":
            status = "BL";
            break;               
        default:
            status = "LEAVEREQUESTMESSEDUP";

    }
    return status;
}

module.exports = {
    extractADay: extractADay
}