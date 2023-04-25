//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.


// Event handling, user interaction is what starts the code execution.

var taskInput=document.querySelector(".task__input");
var addButton=document.querySelector("button");
var incompleteTaskHolder=document.querySelector(".incomplete-tasks");//ul of #incomplete-tasks
var completedTasksHolder=document.querySelector(".completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var task=document.createElement("li");
    task.classList.add("task");
    //input (checkbox)
    var checkBox=document.createElement("input");
    checkBox.classList.add("task__checkbox");
    //label
    var label=document.createElement("label");
    label.classList.add("task__label");
    //input (text)
    var editInput=document.createElement("input");
    editInput.classList.add("task__input", "task__wrapper");
    //button.edit
    var editButton=document.createElement("button");
    editButton.classList.add("button");

    //button.delete
    var deleteButton=document.createElement("button");
    deleteButton.classList.add("button");
    var deleteButtonImg=document.createElement("img");
    deleteButtonImg.classList.add("button__delete-img");

    label.innerText=taskString;
    label.classList.add("task__wrapper");

    //Each elements, needs appending
    checkBox.type="checkbox";
    editInput.type="text";
    editInput.classList.add("task__input");

    editButton.innerText="Edit"; //innerText encodes special characters, HTML does not.
    editButton.classList.add("button__edit");

    deleteButton.classList.add("button__delete");
    deleteButtonImg.src="./remove.svg";
    deleteButton.appendChild(deleteButtonImg);


    //and appending.
    task.appendChild(checkBox);
    task.appendChild(label);
    task.appendChild(editInput);
    task.appendChild(editButton);
    task.appendChild(deleteButton);
    return task;
}



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #add-input:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);
    console.log(listItem)
    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.

var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector('input[type="text"]');
    var label=listItem.querySelector(".task__label");
    var editBtn=listItem.querySelector(".button__edit");
    var containsClass=listItem.classList.contains("edit-mode");
    //If class of the parent is .edit-mode
    if(containsClass){

        //switch to .edit-mode
        //label becomes the inputs value.
        label.innerText=editInput.value;
        editBtn.innerText="Edit";
    }else{
        editInput.value=label.innerText;
        editBtn.innerText="Save";
    }

    //toggle .edit-mode on the parent.
    listItem.classList.toggle("edit-mode");
};


//Delete task.
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the .completed-tasks
    var listItem=this.parentNode;

    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);

}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the .incomplete-tasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
//select ListItems children
    var checkBox=taskListItem.querySelector(".task__checkbox");
    var editButton=taskListItem.querySelector(".button__edit");
    var deleteButton=taskListItem.querySelector(".button__delete");



    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick=deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
