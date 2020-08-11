const task = document.querySelector("#task-list"); //form
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#collection");
const clearTasks = document.querySelector("#clear-task");

loadEvents();

function addTask(e) {
	if (taskInput.value === "" || taskInput.value === null) {
		alert("Enter a task");
	}

	//create li element
	const li = document.createElement("li");

	//add class to li
	li.className = "card__collection-item";

	//create span
	const span = document.createElement("span");

	//add text node
	span.appendChild(document.createTextNode(taskInput.value));

	//create link
	const link = document.createElement("a");

	//add class
	link.className = "card__delete";
	link.id = "delete";

	//add icon html
	link.innerHTML = '<i class="fa fa-times"></i>';

	li.appendChild(span);
	li.appendChild(link);

	taskList.appendChild(li);

	taskInput.value = "";

	console.log(li);

	e.preventDefault();
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains("card__delete")) {
		if (confirm("Are you sure ?")) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

function removeAllTasks(e) {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}
	e.preventDefault();
}

function loadEvents() {
	//add task
	task.addEventListener("submit", addTask);

	//delete task
	taskList.addEventListener("click", removeTask);

	//remove all tasks
	clearTasks.addEventListener("click", removeAllTasks);
}
