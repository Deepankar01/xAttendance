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
                    console.log(to)
                    for (let i = 0; i <= to.diff(from, "days"); i += 1) {
                        console.log("reached");
                        this.employeeDetails[moment(from).add(i, "days").format("DD-MMM")] = selectReason(regularization.category)
                        this.employeeDetails.P = parseInt(this.employeeDetails.P, 10) + 1;
                    }
                });
            };
            return this;
        },
    this.extractLeaveRequestData = (leaveRequestDataJSON) => {
            console.log(this)
            return this;
        },
    this.fillLeaveRequestData = () => {
            return this;
        },
    this.higlightErrors = () => {
            return this;
        }
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
 * Function to process the reason
 * @param {*} category 
 */
const selectReason = (category) => {
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


module.exports = {
    extractADay: extractADay
}