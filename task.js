function addTask() {
  const row = document.createElement("tr");
  const cell = document.createElement("td");
  const table = document.getElementById("task-table");

  const task_div = document.createElement("div");
  task_div.innerHTML = `<img src="img/MainLogo.jpg" class="image"> Task-${table.rows.length + 1}`;
  task_div.classList.add("task-div");

  const editLink = document.createElement("a");
  editLink.href = "task_des.html"; // Add your href value here
  editLink.innerHTML = '<img src="img/edit_pic.svg" >';
  editLink.classList.add("editLink");
  task_div.appendChild(editLink);

  const del = document.createElement("a");
  del.href = "#"; // Add your href value here
  del.innerHTML = '<img src="img/del.svg" >';
  del.classList.add("del");
  
  del.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default action of the link
    // Find the parent row and remove it
    const rowToRemove = event.target.closest("tr");
    rowToRemove.remove();
  });
  task_div.appendChild(del);

  const div_span2 = document.createElement("span");
  div_span2.textContent = "In Progress";
  div_span2.classList.add("div-span-2");
  div_span2.addEventListener("click", function() {
    if (div_span2.innerHTML === "In Progress") {
        div_span2.innerHTML = "Done";
    } else {
        div_span2.innerHTML = "In Progress";
    }
  });

  task_div.append(div_span2);
  cell.append(task_div);

  const add_button = document.createElement("button");
  add_button.textContent = "+";
  add_button.addEventListener("click", addSubtask);
  add_button.classList.add("add-button");
  cell.append(add_button);

  row.append(cell);
  table.append(row);
}
function addSubtask(event) {
  var parentCell = event.target.parentElement;
  var subTaskContainer = document.createElement("div");
  subTaskContainer.classList.add("sub-task-container");
  subTaskContainer.draggable = true;
  var subTaskDiv = document.createElement("div");
  var checkBox = document.createElement("input");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  var subtaskIndex = parentCell.querySelectorAll(".sub-task-div").length + 1;

  checkBox.type = "checkbox";
  checkBox.addEventListener("change", function() {
    if(checkBox.checked) {
      span2.innerHTML = "Done";
    }else {
      span2.innerHTML = "In Progress";
    }
  });
  span1.innerHTML = "Sub Task" +subtaskIndex;
  span2.innerHTML = "In Progress";
  span2.classList.add("span2");
  span2.addEventListener("click", function() {
    if (span2.innerHTML === "In Progress") {
      span2.innerHTML = "Done";
    }else {
      span2.innerHTML = "In Progress";
    }
  });

  subTaskDiv.appendChild(checkBox);
  subTaskDiv.appendChild(span1);
  const editLink = document.createElement("a");
  editLink.href = "task_des.html"; // Add your href value here
  editLink.innerHTML = '<img src="img/edit_pic.svg" alt="Clickable Image">';
  editLink.classList.add("editLink");
  subTaskDiv.appendChild(editLink);
  const del = document.createElement("a");
  del.href = "#"; // Add your href value here
  del.innerHTML = '<img src="img/del.svg" >';
  del.classList.add("del");
  subTaskDiv.appendChild(del);
  del.addEventListener("click", function(event) {
    // Prevent the default behavior of the anchor element
    event.preventDefault();
    // Call your function here
    parentCell.removeChild(subTaskContainer);
  });


  subTaskDiv.appendChild(span2);
  subTaskDiv.classList.add("sub-task-div");

  
  subTaskDiv.addEventListener("click", function() {
      // Toggle class to indicate selection
    subTaskDiv.classList.toggle("selected");
  });
  subTaskContainer.appendChild(subTaskDiv);
  parentCell.appendChild(subTaskContainer);
  subTaskContainer.dataset.index = subtaskIndex;

  // Add drag event listeners to the sub-task container
  subTaskContainer.addEventListener("dragstart", dragStart);
  subTaskContainer.addEventListener("dragover", dragOver);
  subTaskContainer.addEventListener("drop", drop);
}
function dragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.dataset.index);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text/plain");
  var subTaskContainer = document.querySelector(`[data-index="${data}"]`);
  var target = event.target;
  // Ensure that the target is a valid drop zone
  while (target && !target.classList.contains("sub-task-container")) {
    target = target.parentNode;
  }
  if (target) {
    var parent = target.parentNode;
    var targetIndex = Array.from(parent.children).indexOf(target);
    var subTaskIndex = Array.from(parent.children).indexOf(subTaskContainer);
    // If subTaskContainer is being dragged above its current position
    if (subTaskIndex < targetIndex) {
      parent.insertBefore(subTaskContainer, target.nextSibling);
    }else {
      parent.insertBefore(subTaskContainer, target);
    }
  }
}

