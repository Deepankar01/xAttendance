

// document.getElementsByClassName("upload-container").onclick = function(){
//     alert("hello")
// }

var uploadContainers = Array.from(document.getElementsByClassName("upload-container"));
var progressButton = document.getElementById("progress-button");
var form = document.createElement("form");

function sendData(event){
    console.log("hello");
    debugger;
    event.preventDefault();
}

function openFileUploader(event) {
    event.currentTarget.querySelector(".logo input[type='file']").click();
}

function submitData(event){
     
    //  console.log(form);
    //  form.action = "http://localhost:8080";
    //  form.method = "POST";
    //  form.enctype="multipart/form-data";
    //  form.style.display = "none";
     var formData = new FormData(form);
    //  document.body.appendChild(form);
     Array.from(document.getElementsByTagName("input")).forEach((fileInputs)=>{
            formData.append(fileInputs.id.replace("-file",""), fileInputs.files[0]);
     });
        // form.addEventListener('submit',sendData,false);
        // form.submit();
        var request = new XMLHttpRequest();
        request.open("POST", "http://localhost:8080");
        request.send(formData);
        // document.body.removeChild(form);
}

uploadContainers.forEach((uploadContainer) => {
    uploadContainer.addEventListener("click", openFileUploader, false);
});


progressButton.addEventListener("click",submitData,false);

