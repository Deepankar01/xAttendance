

// document.getElementsByClassName("upload-container").onclick = function(){
//     alert("hello")
// }
var { ipcRenderer, remote } = require('electron');
var uploadContainers = Array.from(document.getElementsByClassName("upload-container"));
var inputFiles = Array.from(document.getElementsByTagName("input"));
var progressButton = document.getElementById("progress-button");
var downloadButton = document.getElementById("download-data");
var downloadFileLink = "";
downloadButton.style.display = "none";
//add click event listener
uploadContainers.forEach((uploadContainer) => {
    uploadContainer.addEventListener("click", openFileUploader, false);
});

//add change event listener
inputFiles.forEach((inputFile) => {
    inputFile.addEventListener("change", validateFiles, false);
});

//click of progress button
progressButton.addEventListener("click", submitData, false);

downloadButton.addEventListener("click", downloadData, false);
/**
 * Validate files
 * @param {object} event 
 */
function validateFiles(event) {

    if (event.target.files.length === 0) {
        document.getElementById(event.target.id).parentElement.parentElement.style.backgroundColor = "rgba(255, 149, 149, 0.7)";
    } else {
        document.getElementById(event.target.id).parentElement.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    }
}

/**
 * 
 * @param {object} event 
 */
function openFileUploader(event) {
    event.currentTarget.querySelector(".logo input[type='file']").click();
}

/**
 * Function sending the data from rendered process to main process
 * @param {object} event 
 */
function submitData(event) {

    //a final check to validate the files before submitting
    let isValid = true;
    inputFiles.forEach((inputFile) => {
        if (inputFile.files.length === 0) {
            inputFile.parentElement.parentElement.style.backgroundColor = "rgba(255, 149, 149, 0.7)";
            isValid = isValid ? false : false;
        }
        else {
            isValid = isValid ? true : false;
            inputFile.parentElement.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
        }
    });

    /**
     * If eveything is valid then send the data
     */
    if (isValid) {
        var files = [];
        inputFiles.forEach((fileInputs) => {
            files.push({ "files": fileInputs.id.replace("-file", ""), "path": fileInputs.files[0].path });
        });
        ipcRenderer.send('uploadFiles', files);
    }
    else {
        //show the red icon
    }
}

/**
 * Function to download the data of excel
 * @param {*} event 
 */
function downloadData(event) {
    var dl = document.createElement('a');
    dl.setAttribute('href', downloadFileLink);
    dl.setAttribute('download', "Attendance.xlsx");
    dl.click();
}

ipcRenderer.on("uploadFiles-reply", (event, args) => {
    downloadFileLink = args;
    downloadButton.style.display = "";
});

