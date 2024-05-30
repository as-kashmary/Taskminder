function back() {
    // Redirect to another page
    window.location.href = "task.html";
};
  
 function save() {
    // Code to save input and description
    alert("Data saved successfully!");
  };
  
 function cancel() {
    // Clear input and description fields
    document.getElementById("input").value = "";
    document.getElementById("description").value = "";
  };
  