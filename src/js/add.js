const companynameInput = document.getElementById("companyname");
const jobtitleInput = document.getElementById("jobtitle");
const startdateInput = document.getElementById("startdate");
const enddateInput = document.getElementById("enddate");
const addBtn = document.getElementById("addBtn");
const addMsg = document.getElementById('addMsg');

addBtn.addEventListener("click", postJob, false);

async function postJob(event){
addMsg.innerHTML = '';

    event.preventDefault();

    let job = {
        companyname: companynameInput.value,
        jobtitle: jobtitleInput.value,
        startdate: startdateInput.value,
        enddate: enddateInput.value

    };

    const response = await fetch('http://127.0.0.1:3001/jobs', {
        method: "POST",
        headers: {
            'content-type':'application/json'
        },
        body: JSON.stringify(job)
    });

    let data = await response.json();
    console.log(data);
    if(data.message){
        addMsg.innerHTML = data.message;
    return; }
    addMsg.innerHTML = data.companyname + ' tillagt till CV.';

   return data;


  

}