

// document.getElementsByClassName("upload-container").onclick = function(){
//     alert("hello")
// }

var uploadContainers = Array.from(document.getElementsByClassName("upload-container"));
var inputFiles = Array.from(document.getElementsByTagName("input"));
var progressButton = document.getElementById("progress-button");
var form = document.createElement("form");

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



function validateFiles(event) {

    if (event.target.files.length === 0) {
        document.getElementById(event.target.id).parentElement.parentElement.style.backgroundColor = "rgba(255, 149, 149, 0.7)";
    } else {
        document.getElementById(event.target.id).parentElement.parentElement.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    }
}

/**
 * send the data 
 * @param {object} event 
 */
function sendData(event) {
    console.log("hello");
    debugger;
    event.preventDefault();
}

/**
 * 
 * @param {object} event 
 */
function openFileUploader(event) {
    event.currentTarget.querySelector(".logo input[type='file']").click();
}

/**
 * 
 * @param {object} event 
 */
function submitData(event) {

    //  console.log(form);
    //  form.action = "http://localhost:8080";
    //  form.method = "POST";
    //  form.enctype="multipart/form-data";
    //  form.style.display = "none";

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
        var formData = new FormData(form);
        //  document.body.appendChild(form);
        inputFiles.forEach((fileInputs) => {
            formData.append(fileInputs.id.replace("-file", ""), fileInputs.files[0]);
        });
        // form.addEventListener('submit',sendData,false);
        // form.submit();
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080");
        request.send(formData);
    }
    else {
        //show the red icon
    }


    // document.body.removeChild(form);
}

