// const { List } = require("immutable");
const { regularized, leaveRequest, biometricData } = require("./js/parsers");
const { processor } = require('./js/processor');
const json2xls = require('json2xls');
const fs = require("fs");
const application = function () {
    /**
     * Function to load the data from users local storage
     */
    this.uploadAndRetreiveData = (regularizedDataXLSX, leaveRequestDataXLSX, biometricDataXLSX) => {
        this.regularizedData = regularized(regularizedDataXLSX);
        this.leaveRequestData = leaveRequest(leaveRequestDataXLSX);
        this.biometricData = biometricData(biometricDataXLSX);
        return this;
    }
    this.stripHeaders = () => {
        this.regularizedData.shift();
        this.leaveRequestData.shift();
        this.biometricData.shift();
        return this;
    }
    this.processData = () => {
        this.processedData = processor(this.regularizedData, this.leaveRequestData, this.biometricData);
        return this;
    }
    this.composeExcel = () => {
        let xlsx = json2xls(this.processedData);
        fs.writeFileSync('attendance.xlsx', xlsx, 'binary');
    }
    if (this instanceof application) {
        return this.application;
    } else {
        return new application();
    }
}


module.exports = {
    core: application,
}