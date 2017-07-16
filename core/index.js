const { List } = require("immutable");
const { regularized, leaveRequest, biometricData } = require("./js/parsers");

const application = {
    uploadAndRetreiveData: (regularizedDataXLSX, leaveRequestDataXLSX, biometricDataXLSX) => {
        this.regularizedData = List(regularized(regularizedDataXLSX));
        this.leaveRequestData = List(leaveRequest(leaveRequestData));
        this.biometricData = List(biometricData(biometricDataXLSX));
        return this;
    },
}


module.exports = {
    core: application,
}