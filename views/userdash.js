

// Sample progress data
const progressData = {
    completedTasks: 20,
    tasksInProgress: 10,
    overdueTasks: 5
};

// Function to display progress overview
function displayProgressOverview() {
    const progressInfo = document.getElementById('progress-info');
    progressInfo.innerHTML = `
        <p>Completed Tasks: ${progressData.completedTasks}</p>
        <p>Tasks in Progress: ${progressData.tasksInProgress}</p>
        <p>Overdue Tasks: ${progressData.overdueTasks}</p>
    `;
}

// Sample task summary data
const taskSummary = [
    { taskName: 'Task 1', dueDate: '2024-05-15', projectName: 'Project A' },
    { taskName: 'Task 2', dueDate: '2024-05-20', projectName: 'Project B' },
    { taskName: 'Task 3', dueDate: '2024-05-25', projectName: 'Project C' }
];

// Function to display task summary
function displayTaskSummary() {
    const taskSummaryList = document.getElementById('task-summary-list');
    taskSummaryList.innerHTML = '';
    taskSummary.forEach(task => {
        const listItem = document.createElement('div');
        listItem.innerHTML = `
            <p>${task.taskName}</p>
            <p>Due Date: ${task.dueDate}</p>
            <p>Project: ${task.projectName}</p>
        `;
        taskSummaryList.appendChild(listItem);
    });
}


// Event listener for edit profile button


// Event listener for filter tasks button




displayProgressOverview();

