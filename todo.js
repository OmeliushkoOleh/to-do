let arrOfToDo = [];

const saveToDo = () => {


    const nameInput = document.getElementById("Name");
    const dateInput = document.getElementById("Date");
    const selectedPriority = document.querySelector('input[name="priority"]:checked')?.id || "Low";



    const task = {
        name: nameInput.value.trim(),
        priority: selectedPriority,
        date: dateInput.value,
        progress: "New",
        id: Date.now()
    };
    if (!task.name || !task.date) {
        alert("Please fill all fields.");
        return;
    }
        document.getElementById("Name").value = "";
        document.getElementById("Date").value = "";

    arrOfToDo.push(task);
    reDrawToDoList();
};
const reDrawToDoList = () => {
    document.getElementById("New").innerHTML = "New";
    document.getElementById("InProgress").innerHTML = "In Progress";
    document.getElementById("Finished").innerHTML = "Finished";
    
    arrOfToDo.sort((a, b) => {
        const priorityOrder = { "High": 1, "Medium": 2, "Low": 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    arrOfToDo.forEach((e)=>{
            const newTask = document.createElement("div");
            newTask.className = "task";
            newTask.id = e.id;
            if(e.priority === "High"){
                newTask.style.backgroundColor = "rgba(255, 123, 123, 0.35)";
            } else if(e.priority === "Medium"){
                newTask.style.backgroundColor = "rgba(255, 242, 0, 0.30)";
            }
                        newTask.innerHTML = `
                <div class="task-name"><h2>${e.name}</h2></div>
                <div class="task-deadline"> Deadline:  ${e.date}</div>
                <p>
                    <button class="mark-new" onclick="handleButton(this.closest('.task').id, 'New')" >New</button>
                    <button class="mark-in-progress" onclick="handleButton(this.closest('.task').id, 'InProgress')">In Progress</button>
                    <button class="mark-done" onclick="handleButton(this.closest('.task').id, 'Finished')">Finished</button>
                    <button class="delete-task" onclick="deleteTask(this.closest('.task').id)">Delete</button>
                </p>
                `
            let where;
            switch (e.progress) {
                case "New":
                    where = "New";
                    break;  
                case "InProgress":
                    where = "InProgress";
                    break;  
                case "Finished":
                    where = "Finished";
                    break;  
            }
    document.getElementById(`${where}`).appendChild(newTask);

    })
}

const createNewTask = () => {

}

const handleButton = (id, newProgress) => {
    console.log(id, newProgress);
    const task = arrOfToDo.find(task => task.id == id);
    console.log(task);
    if (task && task.progress !== newProgress) {
        task.progress = newProgress;
        reDrawToDoList();
    }
}    

const deleteTask = (taskId) => {
    if (confirm("Are you sure you want to delete the task??")) {
        arrOfToDo = arrOfToDo.filter(task => task.id != taskId);
        reDrawToDoList();
    }
}