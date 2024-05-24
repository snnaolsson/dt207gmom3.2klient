const workList = document.getElementById("cv-tabell");
const msg = document.getElementById("noJobs");

getCV();

async function getCV(){
    const response = await fetch('http://127.0.0.1:3001/jobs', {
        method: 'GET',
        headers: {
            'content-type': 'application/json'
        }

    });

    let data = await response.json();
    console.log(data);

    printCv(data);
}

function printCv(jobs){
    workList.innerHTML='';
        if(jobs.lenght == 0){
           msg.innerHTML="Det finns inga arbeten att visa!";
        }else{
            msg.innerHTML='';


        jobs.forEach(job => {
            let workTr = document.createElement("tr");
            workTr.innerHTML += `
            <td>${job.companyname}</td>
            <td>${job.jobtitle}</td>
            <td>${job.startdate}</td>
            <td>${job.enddate}</td>`;

            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Radera arbete";
            deleteBtn.id = `button${job.id}`;
            deleteBtn.addEventListener('click', () => deleteJob(job._id));
            workTr.appendChild(deleteBtn);
            workList.appendChild(workTr);

            
        
        });
    }
}

async function deleteJob(id){

    const response = await fetch(`http://127.0.0.1:3001/jobs/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
});

let data = await response.json();
window.alert("Arbetet raderat!");

getCV();
}