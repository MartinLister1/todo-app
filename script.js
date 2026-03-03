var tasks = [];
var currentFilter = 'all';

function addTask() {
  var input = document.getElementById('task-input');
  var text = input.value.trim();

  if (text == '') {
    alert('Please type a task first!');
    return;
  }

  // using Date.now() to give each task a unique id - found this on stackoverflow
  var task = {
    id: Date.now(),
    text: text,
    done: false
  };

  tasks.push(task);
  input.value = '';
  showTasks();
}

function toggleDone(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id == id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  showTasks();
}

function deleteTask(id) {
  var kept = [];
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id != id) {
      kept.push(tasks[i]);
    }
  }
  tasks = kept;
  showTasks();
}

function filterTasks(filter, btn) {
  currentFilter = filter;

  var btns = document.querySelectorAll('.filter-btn');
  for (var i = 0; i < btns.length; i++) {
    btns[i].classList.remove('active');
  }
  btn.classList.add('active');

  showTasks();
}

function showTasks() {
  var list = document.getElementById('task-list');
  list.innerHTML = '';

  var toShow = [];

  for (var i = 0; i < tasks.length; i++) {
    if (currentFilter == 'all') {
      toShow.push(tasks[i]);
    } else if (currentFilter == 'active' && !tasks[i].done) {
      toShow.push(tasks[i]);
    } else if (currentFilter == 'done' && tasks[i].done) {
      toShow.push(tasks[i]);
    }
  }

  for (var i = 0; i < toShow.length; i++) {
    var t = toShow[i];

    var li = document.createElement('li');
    if (t.done) li.className = 'done';

    var span = document.createElement('span');
    span.textContent = t.text;

    var doneBtn = document.createElement('button');
    doneBtn.className = 'done-btn';
    doneBtn.textContent = t.done ? 'Undo' : 'Done';

    // had to wrap this in a function so the right id gets used
    // was getting a bug where all buttons used the last id
    doneBtn.onclick = (function(id) {
      return function() { toggleDone(id); };
    })(t.id);

    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = (function(id) {
      return function() { deleteTask(id); };
    })(t.id);

    li.appendChild(span);
    li.appendChild(doneBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  }

  // count how many are not done yet
  var left = 0;
  for (var i = 0; i < tasks.length; i++) {
    if (!tasks[i].done) left++;
  }
  document.getElementById('task-count').textContent = left + ' tasks left';
}

// let the user press enter to add a task
document.getElementById('task-input').addEventListener('keypress', function(e) {
  if (e.key == 'Enter') {
    addTask();
  }
});