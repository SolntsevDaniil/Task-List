
// UI variables
const doc = document,
	  form = doc.querySelector('#task-form'),
	  taskList = doc.querySelector('.collection'),
	  clearButton = doc.querySelector('.clear-tasks'),
	  filter = doc.querySelector('#filter'),
	  taskInput = doc.querySelector('#task');

// Load all event listeners
loadEventListeners();
function loadEventListeners() {

	doc.addEventListener('DOMContentLoaded', getTasks);
	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', removeTask);
	clearButton.addEventListener('click', clearAll);
	filter.addEventListener('keyup', filterAll);

};

// Get tasks function
function getTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else { tasks = JSON.parse(localStorage.getItem('tasks'))};

	tasks.forEach(function(task) {
		// The same as in addTask function but without comments
		const li = doc.createElement('li');
		li.className = 'collection-item';
		li.appendChild(doc.createTextNode(task));
		const link = doc.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';
		li.appendChild(link);
		taskList.appendChild(li);
	});
};

// Add task function
function addTask() {

	if (taskInput.value == '') { alert('Add a task'); };

		// Create li element
		const li = doc.createElement('li');

		// Adding the class
		li.className = 'collection-item';

		// Create textNode and append it to li
		li.appendChild(doc.createTextNode(taskInput.value));

		// Create new link document
		const link = doc.createElement('a');

		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon
		link.innerHTML = '<i class="fa fa-remove"></i>';

		// Append link to li
		li.appendChild(link);

		// Append li to ul
		taskList.appendChild(li);

		// Storing data in localStorage
		storeInLocalStorage(taskInput.value);

		taskInput.value = '';
		event.preventDefault();
};

// Remove task function
function removeTask() {
	if (event.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are you sure?')) { event.target.parentElement.parentElement.remove(); };
	};
	removeFromLocalStorage(event.target.parentElement.parentElement);
};

// Clear function
function clearAll() {
	while (taskList.firstChild) { taskList.removeChild(taskList.firstChild); };
	localStorage.clear();
};

// Filter function
function filterAll() {
	const text = event.target.value.toLowerCase();
	
	doc.querySelectorAll('.collection-item').forEach(function(task) {
		const item = task.firstChild.textContent;
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else { task.style.display = 'none'; };
	});
};

function storeInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else { tasks = JSON.parse(localStorage.getItem('tasks')); };

	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeFromLocalStorage() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else { tasks = JSON.parse(localStorage.getItem('tasks'))};

	tasks.forEach(function(task, index) {
		if (taskList.textContent == task) {
			tasks.splice(index, 1);
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks));
};