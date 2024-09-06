const rows=[];
document.addEventListener('DOMContentLoaded', loadTasks);
let n=1,s=1;
function addTask() {
    const row = document.createElement("tr");
    

    const cell = document.createElement("td");
    const table = document.getElementById("task-table");
    const task_index=table.rows.length + 1;
    const task_div = document.createElement("div");
    task_div.classList.add("task-div");
    
    const task = document.createElement("div");
    task.innerHTML = `<img src="MainLogo.jpg" class="image">`;
    task.classList.add("task");

    title=`New Task ${task_index}`;

    const taskTitle = document.createElement("p");
    taskTitle.textContent = title;
    
    taskTitle.classList.add("taskTitle");
    task.appendChild(taskTitle);

    const editLink = document.createElement("a");
    editLink.innerHTML = '<img src="edit_pic.svg">';
    editLink.classList.add("editLink");
    editLink.addEventListener('click', function() {
        window.location.href = `/task_des?taskdate=${encodeURIComponent(taskdate)}&dtitle=${encodeURIComponent(title)}&title=${null}`;
    });
    task.appendChild(editLink);

    const del = document.createElement("a");
    del.href = "#";
    del.innerHTML = '<img src="del.svg">';
    del.classList.add("del");
    del.addEventListener("click", function(event) {
        event.preventDefault();
        const rowToRemove = event.target.closest("tr");
        rowToRemove.remove();
    });
    task.appendChild(del);

    const div_span2 = document.createElement("span");
    div_span2.textContent = "In Progress";
    div_span2.classList.add("div-span-2");
    div_span2.addEventListener("click", function() {
        div_span2.innerHTML = div_span2.innerHTML === "In Progress" ? "Done" : "In Progress";
    });

    task.append(div_span2);
    task_div.append(task);
    cell.append(task_div);
    n++;
    const subTaskContainer = document.createElement("div");
    subTaskContainer.classList.add("sub-task-container");
    cell.append(subTaskContainer);

    const add_button = document.createElement("button");
    add_button.textContent = "+";
    add_button.addEventListener("click", addSubtask);
    add_button.classList.add("add-button");
    subTaskContainer.append(add_button);

    row.append(cell);
    table.append(row);

    // row.dataset.index = task_index;
    // row.setAttribute('draggable', 'true'); // Make task draggable
    // row.addEventListener('dragstart', dragStart);
    // row.addEventListener('dragover', dragOver);
    // row.addEventListener('drop', drop);

    //saveTaskToServer();
}

function loadTasks() {
    fetch(`/load-tasks?date=${encodeURIComponent(taskdate)}`)
    .then(response => response.json())
    .then(data => {
        const taskTable = document.getElementById('task-table');
        taskTable.innerHTML = ''; // Clear the table first

        data.forEach(task => {
            const row = document.createElement("tr");
            
            const cell = document.createElement("td");

            const task_div = document.createElement("div");
            const task1 = document.createElement("div");
            task1.innerHTML = `<img src="MainLogo.jpg" class="image">`;
            task_div.classList.add("task-div");
            task1.classList.add("task");
            const title=task.title;
            const taskTitle = document.createElement("p");
            taskTitle.textContent = task.title;
            taskTitle.classList.add("taskTitle");
            task1.appendChild(taskTitle);

            const editLink = document.createElement("a");
            editLink.innerHTML = '<img src="edit_pic.svg">';
            editLink.classList.add("editLink");
            editLink.addEventListener('click', function() {
                window.location.href = `/task_des?taskdate=${encodeURIComponent(taskdate)}&dtitle=${encodeURIComponent(title)}&title=${null}`;
            });
            task1.appendChild(editLink);

            const del = document.createElement("a");
            del.href = "#";
            del.innerHTML = '<img src="del.svg">';
            del.classList.add("del");
            del.addEventListener("click", function(event) {
                event.preventDefault();
                const rowToRemove = event.target.closest("tr");
                rowToRemove.remove();
            });
            task1.appendChild(del);

            const divSpan2 = document.createElement("span");
            divSpan2.textContent = "In Progress";
            divSpan2.classList.add("div-span-2");
            divSpan2.addEventListener("click", function() {
                divSpan2.innerHTML = divSpan2.innerHTML === "In Progress" ? "Done" : "In Progress";
            });

            task1.append(divSpan2);
            task_div.append(task1);
            cell.append(task_div);

            const subTaskContainer = document.createElement("div");
            subTaskContainer.classList.add("sub-task-container");

            const addButton = document.createElement("button");
            addButton.textContent = "+";
            addButton.addEventListener("click", addSubtask);
            addButton.classList.add("add-button");
            subTaskContainer.append(addButton);

            task.subtasks.forEach(subtask => {
                const subTaskDiv = document.createElement("div");
                subTaskDiv.classList.add("sub-task-div");
                subTaskDiv.classList.add("sub-task-div");
                subTaskDiv.setAttribute('draggable', true);  // New line: Make subtask draggable
                subTaskDiv.addEventListener('dragstart', dragStart);  // New line: Add dragstart event listener
                subTaskDiv.addEventListener('dragover', dragOver);  // New line: Add dragover event listener
                subTaskDiv.addEventListener('drop', drop);  // New line: Add drop event listener


                const checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.addEventListener("change", function() {
                    span2.innerHTML = checkBox.checked ? "Done" : "In Progress";
                });

                const subtaskTitle = document.createElement("p");
                subtaskTitle.textContent = subtask.title;

                const span2 = document.createElement("span");
                span2.innerHTML = "In Progress";
                span2.classList.add("span2");
                span2.addEventListener("click", function() {
                    span2.innerHTML = span2.innerHTML === "In Progress" ? "Done" : "In Progress";
                });
                console.log(title,subtask.title);
                const editSubLink = document.createElement("a");
                editSubLink.innerHTML = '<img src="edit_pic.svg">';
                editSubLink.addEventListener('click', function() {
                    window.location.href = `/task_des?taskdate=${encodeURIComponent(taskdate)}&dtitle=${encodeURIComponent(title)}&title=${subtask.title}`;
                });
                editSubLink.classList.add("editLink");

                const delSub = document.createElement("a");
                delSub.href = "#";
                delSub.innerHTML = '<img src="del.svg">';
                delSub.classList.add("del");
                delSub.addEventListener("click", function(event) {
                    event.preventDefault();
                    subTaskContainer.removeChild(subTaskDiv);
                });

                subTaskDiv.appendChild(checkBox);
                subTaskDiv.appendChild(subtaskTitle);
                subTaskDiv.appendChild(editSubLink);
                subTaskDiv.appendChild(delSub);
                subTaskDiv.appendChild(span2);

                subTaskContainer.appendChild(subTaskDiv);
            });

            cell.append(subTaskContainer);
            row.appendChild(cell);
            taskTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error loading tasks:', error);
    });
}

function addSubtask(event) {
     //const taskId = event.target.dataset.taskId;
    const parentCell = event.target.parentElement;
    const subTaskDiv = document.createElement("div");
    

    const checkBox = document.createElement("input");
    const span1 = document.createElement("p");
    const span2 = document.createElement("span");

    const grandparentCell = event.target.closest('.sub-task-container').parentElement;
    const parentTitle = grandparentCell.querySelector('.taskTitle').textContent.trim();
    //console.log(parentTitle);

    checkBox.type = "checkbox";
    checkBox.addEventListener("change", function() {
        span2.innerHTML = checkBox.checked ? "Done" : "In Progress";
    });
    var subtaskIndex = parentCell.querySelectorAll(".sub-task-div").length + 1;
    title=`Sub Task ${subtaskIndex}`;

    //subTaskDiv.setAttribute('id', subtaskIndex);  // Assign a unique ID to each subtask div


    span1.textContent = title;
    s++;
    console.log(parentTitle,title);
    span2.innerHTML = "In Progress";
    span2.classList.add("span2");
    span2.addEventListener("click", function() {
        span2.innerHTML = span2.innerHTML === "In Progress" ? "Done" : "In Progress";
    });

    subTaskDiv.appendChild(checkBox);
    subTaskDiv.appendChild(span1);

    

    const editLink = document.createElement("a");
    editLink.innerHTML = '<img src="edit_pic.svg">';
    editLink.classList.add("editLink");
    editLink.addEventListener('click', function() {
        window.location.href = `/task_des?taskdate=${encodeURIComponent(taskdate)}&dtitle=${encodeURIComponent(parentTitle)}&title=${title}`;
    });
    subTaskDiv.appendChild(editLink);


    const del = document.createElement("a");
    del.href = "#";
    del.innerHTML = '<img src="del.svg">';
    del.classList.add("del");
    subTaskDiv.appendChild(del);
    del.addEventListener("click", function(event) {
        event.preventDefault();
        parentCell.removeChild(subTaskDiv);
    });

    subTaskDiv.appendChild(span2);
    subTaskDiv.classList.add("sub-task-div");

    parentCell.appendChild(subTaskDiv);

    subTaskDiv.dataset.index = subtaskIndex;
    subTaskDiv.setAttribute('draggable', 'true'); // Make subtask draggable
    subTaskDiv.addEventListener('dragstart', dragStart);
    subTaskDiv.addEventListener('dragover', dragOver);
    subTaskDiv.addEventListener('drop', drop);
}

function saveTaskToServer() {
   
    const tasks = [];
    const taskTable = document.getElementById('task-table');
    if (taskTable) {
        const rows = taskTable.querySelectorAll('tr');
        rows.forEach((row, index) => {
            const task = row.querySelector('td');
            const taskdiv = task.querySelector('.task-div'); // Corrected selector
            if (taskdiv) {
                const taskName = taskdiv.querySelector('p');
                const taskContent = taskName ? taskName.textContent.trim() : '';
                //console.log(taskContent);
                // alert("press");
                // Select subtasks within the current task
                const subtaskcontainer = task.querySelector('.sub-task-container'); // Corrected selector and scope
                const subtasks = subtaskcontainer.querySelectorAll('.sub-task-div');
                const subs = [];
                subtasks.forEach((subtaskDiv) => {
                    if (subtaskDiv) {
                        const subtaskName = subtaskDiv.querySelector('p');
                        const subtaskContent = subtaskName ? subtaskName.textContent.trim() : '';
                        //console.log(subtaskContent);
                        //console.log(Subtask ${subtaskIndex + 1} for Task ${index + 1}:, subtaskContent);
                        subs.push({ content: subtaskContent , description: ''});
                    }
                });               
                tasks.push({ content: taskContent, description: '', subtasks: subs });
                
            }
        });
    } else {
        console.log('Task table not found');
    }
    const data = { taskdate, tasks };
    //console.log('Data to Send:', JSON.stringify(data));
    //alert('press');
    fetch('/save-task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(response => {
        if (response.ok) {
            console.log('Tasks saved successfully.');
        } else {
            console.log('Error saving tasks.');
        }
    }).catch(error => {
        console.error('Error:', error);
    });
    
}

function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function dragOver(event) {
    event.preventDefault();  // Necessary to allow a drop
}

function drop(event) {
    event.preventDefault();
    const draggedIndex = event.dataTransfer.getData("text/plain");
    const targetIndex = event.target.dataset.index;

    if (draggedIndex !== targetIndex) {
        const taskTable = document.getElementById('task-table');
        const draggedElement = taskTable.querySelector(`[data-index="${draggedIndex}"]`);
        const targetElement = taskTable.querySelector(`[data-index="${targetIndex}"]`);

        //console.log(targetElement);
        if(targetElement!= null){
            const targetParent = targetElement.parentNode;
            console.log(targetParent);

            const draggedParent = draggedElement.parentNode;

            targetParent.insertBefore(draggedElement, targetElement.nextSibling);
            draggedParent.insertBefore(targetElement, draggedElement.nextSibling);

        }else{
            console.log(taskTable);
        }

        
        //saveTaskToServer();
    }
}

// function drop(event) {
//     event.preventDefault();
    
//     const draggedElementId = event.dataTransfer.getData("text/plain");
//     const draggedElement = document.getElementById(draggedElementId);
    
//     let target = event.target;

//     // Find the closest parent task or subtask container
//     while (target && !target.classList.contains('task-div') && !target.classList.contains('sub-task-container') && !target.classList.contains('sub-task-div')) {
//         target = target.parentNode;
//     }

//     if (target && draggedElement) {
//         if (target.classList.contains('task-div')) {
//             // Insert the dragged task before the target task
//             target.closest('tr').parentNode.insertBefore(draggedElement.closest('tr'), target.closest('tr').nextSibling);
//         } else if (target.classList.contains('sub-task-div')) {
//             // Insert the dragged subtask before or after the target subtask
//             target.parentNode.insertBefore(draggedElement, target.nextSibling);
//         } else if (target.classList.contains('sub-task-container')) {
//             // Append the dragged subtask to the sub-task-container if dropping outside any sub-task-div
//             target.appendChild(draggedElement);
//         }
//     }
// }






  function redirectToProfile() {
      window.location.href = "/profile";
  }
  function print_rows() {
    rows.forEach((row, index) => {
      const mainTask = row.cells[0].querySelector('.task-div');
      const subTasks = row.cells[0].querySelectorAll('.sub-task-div');

      console.log(mainTask.innerText);
      subTasks.forEach((subTask, subIndex) => {
        console.log(subTask.innerText);
      });
    });
  }
