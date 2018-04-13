'use strict';
class TaskList {
	constructor(list, input) {
		this.list = list;
		this.input = input;
	};

	getTasks() {
		let tasks;
		if (localStorage.getItem('tasks') === null) {
			tasks = [];
		} else { tasks = JSON.parse(localStorage.getItem('tasks'))};
		
		let self = this;
		tasks.forEach(function(task) {
			const li = document.createElement('li');
			li.className = 'collection-item';
			li.appendChild(document.createTextNode(task));
			const link = document.createElement('a');
			link.className = 'delete-item secondary-content';
			link.innerHTML = '<i class="fa fa-remove"></i>';

			li.appendChild(link);
			self.list.appendChild(li);
		});
	};

	addTask() {
		if (this.input.value == '') { alert('Add a task'); };

		const li = document.createElement('li');
		li.className = 'collection-item';
		li.appendChild(document.createTextNode(this.input.value));
		const link = document.createElement('a');
		link.className = 'delete-item secondary-content';
		link.innerHTML = '<i class="fa fa-remove"></i>';

		li.appendChild(link);
		list.appendChild(li);

		this.input.value = '';
		event.preventDefault();
	};

	removeTask() {
		if (event.target.parentElement.classList.contains('delete-item')) {
			if (confirm('Are you sure?')) { event.target.parentElement.parentElement.remove(); };
		};
	};

	filterAll() {
		const text = event.target.value.toLowerCase();
	
		document.querySelectorAll('.collection-item').forEach(function(task) {
			const item = task.firstChild.textContent;
			if (item.toLowerCase().indexOf(text) != -1) {
				task.style.display = 'block';
			} else { task.style.display = 'none'; };
		});
	};

	clearAll() {
		while (this.list.firstChild) { this.list.removeChild(this.list.firstChild); };
		localStorage.clear();
	};
};


const form = document.querySelector('#task-form'),
	  list = document.querySelector('.collection'),
	  clearButton = document.querySelector('.clear-tasks'),
	  filter = document.querySelector('#filter'),
	  taskInput = document.querySelector('#task'),
	  tasklist = new TaskList(list, taskInput);

document.addEventListener('DOMContentLoaded', () => { tasklist.getTasks(); });
form.addEventListener('submit', () => { tasklist.addTask(); });
list.addEventListener('click', () => { tasklist.removeTask(); });
clearButton.addEventListener('click', () => { tasklist.clearAll(); });
filter.addEventListener('keyup', () => { tasklist.filterAll(); });