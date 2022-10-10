var i=0; //iteration variables
var j=1; //iteration variables
var tasklist=[];
var statuslist=[];
var statusname=[];


 
window.onload=function(){
    if((JSON.parse(localStorage.getItem("todo-items"))!=null)&&(JSON.parse(localStorage.getItem("status-name"))!=null)&&(JSON.parse(localStorage.getItem("status-items"))!=null)
    ){
        tasklist=JSON.parse(localStorage.getItem("todo-items"));
        statuslist=JSON.parse(localStorage.getItem("status-items"));
        statusname=JSON.parse(localStorage.getItem("status-name"));
        display();
    }
   
}


//function to add a new task works when you click Add Task button
function addTask(){
  /*if(localStorage.getItem("todo-items")==null){
        //if block to display alert box if the input field is empty while clicking add task button.
     if(document.querySelector('#newtask input').value.length==0){
         alert("Please enter a task");
     }
     else{*/
if(document.querySelector('#newtask input').value!=""){
        tasklist.push(document.querySelector('#newtask input').value);
        statuslist.push("defaultstatus");
        statusname.push("Not Yet Started");
        localStorage.setItem('todo-items',JSON.stringify(tasklist));
        localStorage.setItem('status-items',JSON.stringify(statuslist));
        localStorage.setItem('status-name',JSON.stringify(statusname));
        display();

}
else{
        alert("Please enter a input to add task")

}


         //writes a task into the tasklist div container in the todo list page.
         /*document.querySelector("#taskslist").innerHTML+=`
                <div class="task" id="taskid${i}" >
                    <span id="taskname${i}">
                        ${tasklist[i]}
                    </span>
                    
                    <div class="status_delete">
                     <label class=${statuslist[i]} id="statusid${i}">Not Yet Started</label>
                     <button id="editid${i}" onclick="editbox(this.id)"><i class="fa fa-edit"></i></button>
                    
                     <button class="delete" id="deleteid${i}" onclick="deleteTask(this.id)">
                        <i class="far fa-trash-alt"></i>
                     </button>
                    </div>
                    
                </div>
            `*/

            //iterating variable value increased by 1
            const newTask = document.getElementById("newtaskinput");
            newTask.value=""; //after a task is added input field becomes empty.
       /* }
    }
  else{
     display();
    }*/
    

}

//function to delete a task. called when the dustbin icon is clicked.
function deleteTask(clicked_id){
    var clicked_id = "#"+clicked_id;
    const a = document.querySelector(clicked_id);
    var deleteid = Number(clicked_id.charAt(clicked_id.length-1));
    a.parentNode.parentNode.remove();
    tasklist.splice(deleteid,1);
    statuslist.splice(deleteid,1);
    statusname.splice(deleteid,1);
    localStorage.setItem('todo-items',JSON.stringify(tasklist));
    localStorage.setItem('status-items',JSON.stringify(statuslist));
    localStorage.setItem('status-name',JSON.stringify(statusname));
       
}

    

function search(){
        document.querySelector(".searchcontainer").classList.toggle('active');
}

function clearsearch(){
    document.querySelector("#search").value="";
}

function editbox(editid){
    
    var editid = editid.charAt(editid.length-1);
    const b = editid;
    const c = document.getElementById(`taskname${b}`).innerText;
    
    if(j==1){
        document.querySelector("body").innerHTML+=`
        <div id="editbox" class="editbox">
            
            <div class="editbox_content" id="editbox_content">
              
               <span class="close" onclick="editclose()">&times;</span>
               <div id="edittask">
                   <input value=${tasklist[b]} id="edittaskinput" type="text" placeholder="Edit here..." onkeypress="if(event.keyCode==13){editTask(${b});}" >
               </div>
               <div class="status_options" id="status_options">
                  <h4>Task Status:</h4>
                  <div id="statuslist">
                     <input type="radio" id="unbegun" name="status" value="Not Yet Started" onkeypress="if(event.keyCode==13){editTask(${b});}">
                     <label for="unbegun">Not Yet Started</label><br>
                     <input type="radio" id="pending" name="status" value="Pending" onkeypress="if(event.keyCode==13){editTask(${b});}">
                     <label for="pending">Pending</label><br>
                     <input type="radio" id="completed" name="status" value="Completed" onkeypress="if(event.keyCode==13){editTask(${b});}">
                     <label for="completed">Completed</label><br>
                  </div>
                  
               </div>
               <button class="save_edit" onclick="editTask(${b})">Save Changes</button>
            </div>
        </div>
    
        `
       

      var editbox = document.getElementById("editbox");
      editbox.style.display = "block";
      j+=1;

    }

    else{
        
        document.querySelector('#edittaskinput').value=c;
        var editbox = document.getElementById("editbox");
        editbox.style.display = "block";
        
        document.querySelector("#edittaskinput").setAttribute('onkeypress',`if(event.keyCode==13){editTask(${b});}`);  /*`<input id="edittaskinput" type="text" placeholder="Task to be done.." onkeypress="if(event.keyCode==13){editTask(${b});}" >`*/
        document.querySelector("#unbegun").setAttribute('onkeypress',`if(event.keyCode==13){editTask(${b});}`);
        document.querySelector("#pending").setAttribute('onkeypress',`if(event.keyCode==13){editTask(${b});}`);
        document.querySelector("#completed").setAttribute('onkeypress',`if(event.keyCode==13){editTask(${b});}`);
        document.querySelector(".save_edit").setAttribute('onclick',`editTask(${b})`);
        
    }
    
}

function editclose(){
    var editbox = document.getElementById("editbox");   
    editbox.style.display = "none";
}   

function editTask(id){
    neweditid = `#taskname${id}`;
    newstatusid = `#statusid${id}`;
    tasklist[id]=document.querySelector('#edittaskinput').value;
    localStorage.setItem('todo-items',JSON.stringify(tasklist));
    document.querySelector(neweditid).innerHTML = tasklist[id];
    
    const radioButtons = document.querySelectorAll('input[name="status"]');
    for(const radioButton of radioButtons){
        if(radioButton.checked){
            
            
            if(radioButton.value=="Pending"){
                document.querySelector(newstatusid).setAttribute('class','status2')
                statuslist[id]="status2";
                localStorage.setItem('status-items',JSON.stringify(statuslist));

                statusname[id]="Pending";
                localStorage.setItem('status-name',JSON.stringify(statusname));
                document.querySelector(newstatusid).innerText=statusname[id];
                break;
            }
            else if(radioButton.value=="Completed"){
                document.querySelector(newstatusid).setAttribute('class','status3')
                statuslist[id]="status3";
                localStorage.setItem('status-items',JSON.stringify(statuslist));
                statusname[id]="Completed";
                localStorage.setItem('status-name',JSON.stringify(statusname));
                document.querySelector(newstatusid).innerText=statusname[id];
                break;
            }
            else if(radioButton.value=="Not Yet Started"){
                document.querySelector(newstatusid).setAttribute('class','defaultstatus')
                statuslist[id]="defaultstatus";
                localStorage.setItem('status-items',JSON.stringify(statuslist));
                statusname[id]="Not Yet Started";
                localStorage.setItem('status-name',JSON.stringify(statusname));
                document.querySelector(newstatusid).innerText=statusname[id];
                break;
            }
            
        }
    }
    editclose();
}

function clearAllTasks(){
    if(confirm("Warning!!! Do you want to clear all tasks?")==true){
        document.querySelector("#taskslist").innerHTML="";
        tasklist=[];
        statuslist=[];
        statusname=[];
        localStorage.setItem('todo-items',JSON.stringify(tasklist));
        localStorage.setItem('status-items',JSON.stringify(statuslist));
        localStorage.setItem('status-name',JSON.stringify(statusname));
       
    }
    
}

function display(){
    
  for(;i<tasklist.length;i++){
        document.querySelector("#taskslist").innerHTML+=`
        <div class="task" id="taskid${i}" >
            <span id="taskname${i}">
            ${tasklist[i]}
            </span>
        
            <div class="status_delete">
                <label class=${statuslist[i]} id="statusid${i}">${statusname[i]}</label>
                <button id="editid${i}" onclick="editbox(this.id)"><i class="fa fa-edit"></i></button>
        
                <button class="delete" id="deleteid${i}" onclick="deleteTask(this.id)">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        </div>
        `
        
    }
   
    
}