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

	//Persist to Local Storage
	addTaskToLocalStorage(taskInput.value);

	taskInput.value = "";

	// console.log(li);

	e.preventDefault();
}

function removeTask(e) {
	if (e.target.parentElement.classList.contains("card__delete")) {
		if (confirm("Are you sure ?")) {
			e.target.parentElement.parentElement.remove();

			//Remove from Local Storage
			removeFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

function removeFromLocalStorage(taskItem) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.forEach(function (task, index) {
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeAllTasks(e) {
	while (taskList.firstChild) {
		taskList.removeChild(taskList.firstChild);
	}

	//clear tasks from Local Storage
	clearTasksFromLocalStorage();

	e.preventDefault();
}

function clearTasksFromLocalStorage() {
	localStorage.clear();
}

function addTaskToLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	tasks.push(task);

	localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Get tasks form LS
function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"));
	}

	//loop through an array
	tasks.forEach(function (task) {
		//create li element
		const li = document.createElement("li");

		//add class to li
		li.className = "card__collection-item";

		//create span
		const span = document.createElement("span");

		//add text node
		span.appendChild(document.createTextNode(task));

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
	});
}

function loadEvents() {
	//DOM Load Event
	document.addEventListener("DOMContentLoaded", getTasks);

	//add task
	task.addEventListener("submit", addTask);

	//delete task
	taskList.addEventListener("click", removeTask);

	//remove all tasks
	clearTasks.addEventListener("click", removeAllTasks);
}
