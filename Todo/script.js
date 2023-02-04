var savebtnNode=document.getElementById("savebtn");
var paneparentNode=document.getElementById("paneparent")
var tasklistNode=document.getElementById("tasklist")
var leftpaneNode=document.getElementById("leftpane")
var rightpaneNode=document.getElementById("rightpane")
var textareaNode=document.getElementById("input");


savebtnNode.addEventListener("click",function()
{

  if(textareaNode.value && savebtnNode.innerHTML==="Save")
  {
    data={
      task:textareaNode.value,
      count:JSON.stringify(Date.now())
    }
    addquestiontoTasklist(textareaNode.value,data.count);
    sendDataToServer(data);
    textareaNode.value="";

  }
  else{
    alert("Enter valid tasks");
  }

})


function main()
{
  gettasksFromServer(function(alltasks)
  {
    alltasks.forEach(function(todo)
    {
      addquestiontoTasklist(todo.task,todo.count);
    })
  });
}
main();


function addquestiontoTasklist(value,id)
{
  var taskcontainer=document.createElement("div");
  taskcontainer.style.display="flex";
  taskcontainer.style.margin="5px";
  taskcontainer.style.justifyContent="space-between"
  taskcontainer.style.backgroundColor="black";

  var title=document.createElement("h3");
  title.innerHTML=value;
  title.style.color="white";

  var taskid=document.createElement("p");
  taskid.innerHTML=id;
  taskid.style.color="white";
  taskid.style.display="none";

  var btncontainer=document.createElement("div");
  btncontainer.style.display="flex";
  btncontainer.style.justifyContent="space-between";
  btncontainer.style.width="120";




  var readbtn=document.createElement("button");
  readbtn.innerHTML="Read";
  readbtn.style.backgroundColor="green";
  readbtn.style.cursor="pointer";
  readbtn.style.color="white";


  readbtn.addEventListener("click",function(event)
  {
    event.target.parentNode.parentNode.children[0].style.textDecoration="line-through";
  })
  var deletebtn=document.createElement("button");
  deletebtn.innerHTML="Delete";
  deletebtn.style.backgroundColor="red";
  deletebtn.style.color="white";
  deletebtn.style.cursor="pointer";
  deletebtn.addEventListener("click",ondeletebtnclick);

  btncontainer.appendChild(readbtn);
  btncontainer.appendChild(deletebtn);

  taskcontainer.appendChild(title);
  taskcontainer.appendChild(taskid);
  taskcontainer.appendChild(btncontainer);

  tasklistNode.appendChild(taskcontainer);

  

}
function gettasksFromServer(onResponse)
{
  var request=new XMLHttpRequest();
  request.open("get","/todo")
  request.send();
  request.addEventListener("load",function()
  {
    // console.log(typeof(JSON.parse(request.responseText)));
    // todos=JSON.parse(todos);
    // console.log(todos)
    var todos=JSON.parse(request.responseText);
    if(todos)
     onResponse(todos);
    else
     onResponse([]);
  })
}
function sendDataToServer(data)
{

  var request=new XMLHttpRequest();
  request.open("post","/save");
  request.setRequestHeader("Content-type","application/json");
  request.send(JSON.stringify(data));
  // request.addEventListener("load",function(){
  //  if(request.status===200)
  //    alert("task saved successfully");
  //  else if(request.status===400)
  //    alert("Error in saving tasks");
  // })
}

function ondeletebtnclick(event)
{
  // console.log(event.target.parentNode.parentNode.children[1].innerHTML);

  var request=new XMLHttpRequest();
  request.open("post","/delete");
  request.setRequestHeader("Content-type","application/json")
  request.send(JSON.stringify({count:event.target.parentNode.parentNode.children[1].innerHTML}));
  // request.addEventListener("load",function()
  // {
  //   // console.log(request.status)
  //  if(request.status===200)
  //    alert("task deleted successfully");
  //  else if(request.status===400)
  //    alert("Error in deleting  tasks");
  //  else if(request.status===404)
  //    alert("Task not Found");
   
  // })
  var removetask=event.target.parentNode.parentNode;
  tasklistNode.removeChild(removetask);
}
